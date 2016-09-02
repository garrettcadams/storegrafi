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

	componentWillReceiveProps: function(nextProps){
		
		ACTIONS.fetchFrontStoreProducts(nextProps.userName)
	
	},

	componentWillUnmount: function() {
		IG_STORE.off('updateContent')
	},

	render: function(){

		return(

				<div className="public-store-view">
						<div className="row expanded border-bottom">
							<div className="large-12 large-centered columns">
								<img className="placeholder-store-icon" src='../images/default-store-icon.jpg' />
								<h1 className="store-name">{this.props.userName}</h1>
								<div className="store-description">
									<p>Welcome to our Instagram store! Tap to buy any of the products below.</p>
								</div>
							</div>
						</div>
						
						<FrontStoreContainer myProducts={this.state.frontStoreColl} />

						<div className="row">
							<div className="large-12 columns">
								<p className="text-center powered-by">Powered by Storegrafi</p>
							</div>
						</div>
				</div>

			)
	}
})

const FrontStoreContainer = React.createClass ({
	
	render: function(){
		
		return(
				<div className="row small-up-3 medium-up-3 small-collapse">
					{this.props.myProducts.map((product, i)=> <PhotoBlock product={product} key={i}/> )}
				</div>
			)
	}
})

const PhotoBlock = React.createClass ({
	
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

	_handleSingleProduct: function(){
		location.hash = 'u/' + this.props.product.get('userName') + '/' + this.props.product.get('_id')
	},

	render: function(){

		console.log('PRODUCT PROPS>>>', this.props.product)

		return (
				<div className="column">
					<div className="photo-block">
						<a onClick={this._handleSingleProduct}>
							<img src={this.props.product.get('imageUrl')} />
						</a>
						
					</div>
					
				</div>
			)
	}
})

export default UserFrontStore