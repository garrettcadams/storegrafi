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
			var stripeRedirectUri = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_8wmHRCgyot68xzsAQZF5qorY0qV1pCvP&scope=read_write'
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
							<h2>Payment Settings</h2>
							<p>Easily accept credit/debit cards with Stripe Payments:</p>
							<ul>
								<li>There are <strong>zero monthly or initial setup fees</strong> to create a Stripe account. You can create an account for free and in just a matter of minutes.</li>
								<li>Stripe seamlessly integrates mobile payments so your Instagram visitors can buy things on the go without ever leaving your store.</li>
								<li>The total transaction fee you'll pay when you make a successful sale is <strong>only 4.9% + $0.30</strong> (2.9% plus $0.30 Stripe fees + 2% Storegrafi fee).</li>
								<li>After each successful sale, your money will be direct-deposited in your <em>own</em> bank account <strong>within 2 business days!</strong></li>
								<li>Thousands of small and large companies use and trust Stripe to power commerce for their business.</li>

							</ul>


							<a className="stripe-connect" href={stripeRedirectUri}><img src="../images/blue-on-light.png" /></a>
						</div>
					</div>
				</div>

			)
	}
})



export default SettingsView
