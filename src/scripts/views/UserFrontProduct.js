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
			<div className="public-store-view public-single-product">

				<div className="row ">
					<div className="small-12 small-centered medium-12 medium-centered large-6 large-centered columns">
						<img className="placeholder-store-icon" src='../images/default-store-icon.jpg' />
						<h1 className="store-name">{this.props.userName}</h1>
						
					</div>
				</div>

				<div className="row small-collapse">
					<div className="small-12 small-centered medium-12 medium-centered large-6 large-centered columns">
						<ProductContainer product={this.state.frontProductMod} />
					</div>

				</div>

				<div className="row">
					<div className="large-12 columns">
						<p className="text-center powered-by">Powered by Storegrafi</p>
					</div>
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
					<img className="featured-picture" src={this.props.product.get('imageUrl')} />

					<div className="row">
						<div className="large-12 columns">
							<h2 className="product-title">{this.props.product.get('title')}</h2>
							<p className="product-description">{this.props.product.get('description')}</p>
							<a onClick={this._handleStripeCheckout} className="button buy-now">Buy now for ${this.props.product.get('price')}</a>
							<img className="secure-subheading centered-image" src='../images/cta-subheading.jpg' />
						</div>
					</div>
					
				</div>
			)
	}
})


export default UserFrontProduct