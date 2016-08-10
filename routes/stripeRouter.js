let Router = require('express').Router
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Product = require('../db/schema.js').Product

let stripe = require('stripe')('sk_test_gtePgSycICsHqbcB5aC35yfC')
let request = require('request')
let secrets = require('../config/secrets')

const stripeRouter = Router()

// Set Stripe test keys if we are in localhost test environment
if (process.env.NODE_ENV === "development") {
	var CLIENT_ID = secrets.CLIENT_ID
	var SECRET_KEY = secrets.SECRET_KEY
}

// otherwise, grab live keys from Heroku config vars
else {
	var CLIENT_ID = process.env.CLIENT_ID
	var SECRET_KEY = process.env.SECRET_KEY
}

console.log('YOUR CURRENT STRIPE BASED ON YOUR ENV CLIENT_ID>>>', CLIENT_ID)
console.log('YOUR CURRENT STRIPE BASED ON YOUR ENV SECRET_KEY>>>', SECRET_KEY)


stripeRouter.get('/code', function(req,res) {
	let code = req.query.code

	request.post({
		url: 'https://connect.stripe.com/oauth/token',
		form: {
		  grant_type: "authorization_code",
		  client_id: CLIENT_ID,
		  code: code,
		  client_secret: SECRET_KEY
		  }
		}, 

		function(err, r, body) {
		
			var bodyJSON = JSON.parse(body)

			// Updating User model with Stripe Connect keys
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
				
			}) 

			// Updating products model with Stripe response keys
			Product.update({userId: req.user._id}, {

			  "stripePubKey": bodyJSON.stripe_publishable_key,
			  "stripeId": bodyJSON.stripe_user_id,
			  "stripeRefreshToken": bodyJSON.refresh_token,
			  "stripeToken": bodyJSON.access_token,

			}, { multi: true }, function(err, record){
			
				if(err) {
					console.log('COULDNT UPDATE USER >>>', err)
			    } 

			    console.log('NICE! ALL PRODUCTS ARE UPDATED WITH STRIPE KEYS>>>', record)
				
			}) 
		}
	)
})


// STRIPE CUSTOM ROUTE TO CREATE A CHARGE
stripeRouter.post('/charge', function(req, res){
	  
  var TOKEN = req.body.token // Stripe charge token
  var CENTS_PRICE = req.body.price // Stripe price in cents
  var CONNECTED_ID = req.body.stripeId // Stripe Connect platform user ID
  var APP_FEE = req.body.storegrafiFee


  var charge = stripe.charges.create({
    amount: CENTS_PRICE, // amount in cents, again
    currency: "usd",
    source: TOKEN,
    description: "Storegrafi order",
    application_fee: APP_FEE, // Platform fee in cents (2%)
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