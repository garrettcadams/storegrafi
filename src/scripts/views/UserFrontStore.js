import React from 'react'
import MainMenu from './MainMenu'

//import models
import {User, ProductModel, ProductCollection} from '../models/models'
import ACTIONS from '../actions.js'
import IG_STORE from '../store.js'
import $ from 'jquery'


const UserFrontStore = React.createClass ({
	
	getInitialState: function(){
		return IG_STORE.getData()
	},

	componentWillMount: function(){
			
		ACTIONS.fetchFrontStoreProducts(this.props.userName)
		
		IG_STORE.on('updateContent', ()=>{
			this.setState(IG_STORE.getData())
		})
	},

	componentWillUnmount: function() {
		IG_STORE.off('updateContent')
	},

	render: function(){

		console.log('front store collection >>>>', this.state.frontStoreColl)
		
		return(

				<div id="front-store">
						<FrontStoreContainer myProducts={this.state.frontStoreColl} />
				</div>

			)
	}
})

const FrontStoreContainer = React.createClass ({
	
	render: function(){
		
		return(
				<div className="row small-up-3 small-collapse">
					{this.props.myProducts.map((product, i)=> <PhotoBlock product={product} key={i}/> )}
				</div>
			)
	}
})

const PhotoBlock = React.createClass ({
	
	_handleStripeCheckout:function(e){
		var self = this;
		var priceInCents = Math.floor(this.props.product.get('price') * 100)
		
		var handler = StripeCheckout.configure({
		    key: self.props.product.get('stripePubKey'),
		    // image: '/img/documentation/checkout/marketplace.png',
		    locale: 'auto',
		    token: function(token) {
		      // You can access the token ID with `token.id`.
		      // Get the token ID to your server-side code for use.

		      console.log('STRIPE TOKEN OBJECT RETURNED >>>', token)
		      
		      return $.ajax({
					method: 'POST',
					type: 'json',
					url: '/stripe/charge',
					data: {
						token: token.id,
						price: priceInCents,
						stripeId: self.props.product.get('stripeId'),
					}
				})
		    }
		 })

		//Open Checkout with further options:
	    handler.open({
	      name: this.props.product.get('userName'),
	      description: this.props.product.get('title'),
	      amount: priceInCents,
	    })

	    e.preventDefault();

	    // Close Checkout on page navigation:
		  $(window).on('popstate', function() {
		    handler.close();
		  });
	},

	render: function(){

		console.log('PRODUCT>>',this.props.product)

		return (
				<div className="column">
					<div className="photo-block">
						<img src={this.props.product.get('imageUrl')} />
						<button onClick={this._handleStripeCheckout} className="button stripe">Buy Now</button>

					</div>
					
				</div>
			)
	}
})

export default UserFrontStore