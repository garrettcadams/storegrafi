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
				<div className="products-wrapper">
					<h1>Public Store View</h1>
					<FrontStoreContainer myProducts={this.state.frontStoreColl} />
				</div>
			)
	}
})

const FrontStoreContainer = React.createClass ({
	
	render: function(){
		
		return(
				<div className="products-container">
					{this.props.myProducts.map((product, i)=><PhotoBlock product={product} key={i}/>)}
				</div>
			)
	}
})

const PhotoBlock = React.createClass ({
	
	
	_handleStripeCheckout:function(e){

		var priceInCents = this.props.product.get('price') * 100
		
		var handler = StripeCheckout.configure({
		    key: 'pk_test_074B0PdVPVpkE645iNltx6Ps',
		    // image: '/img/documentation/checkout/marketplace.png',
		    locale: 'auto',
		    token: function(token) {
		      // You can access the token ID with `token.id`.
		      // Get the token ID to your server-side code for use.
		      
		      console.log(token)
		      return $.ajax({
					method: 'POST',
					type: 'json',
					url: 'api/stripe/charge',
					data: {
						id: token.id
					}
				})
		    }
		  });


		//Open Checkout with further options:
	    handler.open({
	      name: this.props.product.get('userName'),
	      description: this.props.product.get('title'),
	      amount: priceInCents,
	    });
	    e.preventDefault();

	    // Close Checkout on page navigation:
		  $(window).on('popstate', function() {
		    handler.close();
		  });
	},

	render: function(){

		return (
				<div className="col-md-4">
					<img src={this.props.product.get('imageUrl')} />
					<button onClick={this._handleStripeCheckout} className="stripeButton">Buy Now</button>
				</div>
			)
	}
})

export default UserFrontStore