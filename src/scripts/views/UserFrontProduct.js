import React from 'react'
import MainMenu from './MainMenu'

//import models
import {User, ProductModel, ProductCollection} from '../models/models'
import ACTIONS from '../actions.js'
import IG_STORE from '../store.js'
import $ from 'jquery'


const UserFrontProduct = React.createClass ({
	
	getInitialState: function(){
		return IG_STORE.getData()

	},

	componentWillMount: function(){
	
		ACTIONS.fetchOneStoreProduct(this.props.productId)
		
		IG_STORE.on('updateContent', ()=>{
			this.setState(IG_STORE.getData())
		})

	},

	componentWillUnmount: function() {
		IG_STORE.off('updateContent')
	},

	render: function() {

		return(

				<div className="row">
					<div className="large-6 large-centered columns">
						<h1>Single Product View</h1>
						<ProductContainer product={this.state.frontProductMod} />
					</div>

				</div>

			)
	}
})

const ProductContainer = React.createClass ({
	
	_handleStripeCheckout:function(e){
		var self = this;
		var priceInCents = Math.floor(this.props.product.get('price') * 100)
		var storegrafiFee = Math.floor(priceInCents * 0.02) // (App's 2% fee)
		
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
						storegrafiFee: storegrafiFee,
					}
				})
		    }
		 })

		//Open Checkout with further options:
	    handler.open({
	      name: self.props.product.get('userName'),
	      description: self.props.product.get('title'),
	      amount: priceInCents,
	    })

	    e.preventDefault();

	    // Close Checkout on page navigation:
		  $(window).on('popstate', function() {
		    handler.close();
		  });
	},

	render: function(){
		console.log('PROPS ON SINGLE PRODUCT>>>', this.props.product)
		return (
				<div className="product-wrapper">
					<h2>{this.props.product.get('title')}</h2>
					<img src={this.props.product.get('imageUrl')} />
					<p>{this.props.product.get('description')}</p>
					<a onClick={this._handleStripeCheckout} className="button">Buy now for ${this.props.product.get('price')}</a>
				</div>
			)
	}
})


export default UserFrontProduct