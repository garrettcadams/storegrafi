// import core libraries
import React from 'react'

// import views
import MainMenu from './MainMenu'

//import models
import {User, ProductModel, ProductCollection} from '../models/models'
import ACTIONS from '../actions.js'
import IG_STORE from '../store.js'
import {parseParamString} from '../utils'
import $ from 'jquery'


const StripeConfirmation = React.createClass ({

	
	componentWillMount: function(){
		console.log('hitting componentWillMount...')
		this._getAuthCode()
	},

	_getAuthCode: function(){
		var code = parseParamString(this.props.params).code
		console.log('code >>>',code)
		$.getJSON('/stripe/code',{code:code}).then(function(resp){
			console.log(resp)
		},
			function(err){
				console.log(err)
			})
	},

	render: function(){

		console.log('hitting render on settings...')
		
		return(

				<div id="dashboard">
					<div className="expanded row">
						<div id="navigation" className="medium-3 columns">
							<a id="logo" href="#dashboard">
								<img src="../images/logo.png" alt="Storegrafi logo" />
							</a>
							<MainMenu />
						</div>

						<div id="app-view" className="medium-9 columns">
							<h2>Success!</h2>
							<img className="stripe-success" src="../images/check-mark-icon.png" />
							<p>You are all set up to receive payments with Stripe! Now you can share this public URL with others through your Instagram bio or anywhere else online: <strong>https://storegrafi.herokuapp.com/#u/ + yourUserNameHere</strong>. (i.e. https://storegrafi.herokuapp.com/#u/tomsbakedgoods)</p>
						</div>
					</div>
				</div>

			)
	}
})



export default StripeConfirmation
