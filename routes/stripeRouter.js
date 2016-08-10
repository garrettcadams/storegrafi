let Router = require('express').Router
let User = require('../db/schema.js').User
let stripe = require('stripe')('sk_test_gtePgSycICsHqbcB5aC35yfC')
let request = require('request')

const stripeRouter = Router()

var CLIENT_ID = 'enter production id here' // Stripe Connect client ID
var API_KEY = 'i dunno if this is the asame or not' // Stripe secret API Key

if (process.env.NODE_ENV === "development") {
	CLIENT_ID = 'ca_8wmH1pUZdKdUGfgcQIMNVXjluE1LTFfK'
	API_KEY = 'sk_test_gtePgSycICsHqbcB5aC35yfC'
}

stripeRouter.get('/code', function(req,res) {
	console.log('YOUR CURRENT CLIENT_ID KEY>>>', CLIENT_ID)
	console.log(req.query)
	let code = req.query.code

	request.post({
		url: 'https://connect.stripe.com/oauth/token',
		form: {
		  grant_type: "authorization_code",
		  client_id: CLIENT_ID,
		  code: code,
		  client_secret: API_KEY
		  }
		}, 

		function(err, r, body) {
			console.log(err)
			console.log('got response from stripe oauth')
			console.log('STRIPE RESPONSE BODY>>>', body)
		
			var bodyJSON = JSON.parse(body)

			console.log('BODY STRIPE USER ID>>', JSON.parse(body).stripe_user_id)


			User.findByIdAndUpdate(req.user._id, {

			  "stripe_publishable_key": bodyJSON.stripe_publishable_key,
			  "stripe_user_id": bodyJSON.stripe_user_id,
			  "refresh_token": bodyJSON.refresh_token,
			  "access_token": bodyJSON.access_token,

			}, function(err, record){
			
				if(err) {
					console.log('COULDNT UPDATE USER >>>', err)
			        res.send(err) 
			    } 

			    console.log('NICE! USER UPDATED>>>', record)
			    res.json(record)
				
			}) // end of findByIdAndUpdate
		}
	)
})


// STRIPE CUSTOM ROUTE TO CREATE A CHARGE
stripeRouter.post('/charge', function(req, res){
	
  console.log('hitting POST route on Stripe ROUTER...')
  
  var TOKEN = req.body.token // Stripe charge token
  var CENTS_PRICE = req.body.price // Stripe price in cents
  var CONNECTED_ID = req.body.stripeId // Stripe Connect platform user ID

  console.log('TOKEN>>>', TOKEN)
  console.log('CENTS_PRICE>>>', CENTS_PRICE)
  console.log('CONNECTED_ID>>>', CONNECTED_ID)


  var charge = stripe.charges.create({
    amount: CENTS_PRICE, // amount in cents, again
    currency: "usd",
    source: TOKEN,
    description: "Storegrafi order",
    application_fee: 100, // Platform fee in cents (change to 2%)
  	}, {stripe_account: CONNECTED_ID},

  	function(err, charge) {
      
      if (err && err.type === 'StripeCardError') {
        console.log('HERE IS THE STRIPE ERROR>>>', err)
        res.send(err)
      }

      console.log('HERE IS THE STRIPE CHARGE>>>', charge)
      res.json(charge)

    }
  )
})

module.exports = stripeRouter