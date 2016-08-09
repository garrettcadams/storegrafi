// import core libraries
import React from 'react'

// import views
import MainMenu from './MainMenu'

//import models
import {User, ProductModel, ProductCollection} from '../models/models'
import ACTIONS from '../actions.js'
import IG_STORE from '../store.js'


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
		return(

				<div className="store-settings">
					<h2>Setup payments for your store:</h2>
					<a className="stripe-connect button" href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_8wmH1pUZdKdUGfgcQIMNVXjluE1LTFfK&scope=read_write">Connect with Stripe</a>
				</div>
			)
	}
})



export default SettingsView
