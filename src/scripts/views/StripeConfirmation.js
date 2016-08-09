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
		var code = parseParamString(this.props.paramString).code
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

				<div className="store-settings">
					<h2>You've successfully connected!</h2>
				</div>
			)
	}
})



export default StripeConfirmation
