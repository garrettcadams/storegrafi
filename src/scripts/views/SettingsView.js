// import core libraries
import React from 'react'

// import views
import MainMenu from './MainMenu'

//import models
import {User, ProductModel, ProductCollection} from '../models/models'
import ACTIONS from '../actions.js'
import IG_STORE from '../store.js'

import {findCookie} from '../utils'

// getting cookie with environment variable value
var app_name = findCookie('tiy_full_stack_app_name')
var environment = findCookie(app_name + '_ENV')


const SettingsView = React.createClass ({

	getInitialState: function(){
		return IG_STORE.getData()
	},

	componentWillMount: function(){
		IG_STORE.on('updateContent', ()=>{
			this.setState(IG_STORE.getData())
		})
	},

	componentWillUnmount: function() {
		IG_STORE.off('updateContent')
	},

	render: function(){

		// set proper redirect URL for Stripe based on ENV

		if (environment === 'dev') {
			var stripeRedirectUri = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_8wmH1pUZdKdUGfgcQIMNVXjluE1LTFfK&scope=read_write'
		}

		else if (environment === 'prod') {
			var stripeRedirectUri = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_8wmH1pUZdKdUGfgcQIMNVXjluE1LTFfK&scope=read_write'
		}

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
							<h2>Setup payments for your store:</h2>
							<a className="stripe-connect button" href={stripeRedirectUri}>Connect with Stripe</a>
						</div>
					</div>
				</div>

			)
	}
})



export default SettingsView
