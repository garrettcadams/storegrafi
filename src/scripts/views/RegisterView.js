import React from 'react'
import hello from 'hellojs'

//import views
import MainMenu from './MainMenu'

//import actions
import ACTIONS from '../actions'


const RegisterView = React.createClass({

    render: function() {
        return (

        	<div id="dashboard">
				<div className="row">
					<div className="medium-6 medium-centered large-4 large-centered columns login-register-box">
						<img className="centered-image" src="../images/logo-icon.png" />
						<h2>Create Account</h2>
						<RegisterBox />
					</div>

				</div>

			</div>

            )
    }
})

const RegisterBox = React.createClass({

	_handleRegister: function(evt) {
		evt.preventDefault()

		ACTIONS.registerUser({
			email: evt.currentTarget.email.value,
			password: evt.currentTarget.password.value,
			userName: evt.currentTarget.userName.value,
		})
		
	},

	render: function() {
		return (
			<div className="loginBox register container">
				<form onSubmit={this._handleRegister} >
					
					<label>Enter a username
        				<input type="text" name="userName" />
     				</label>

     				<label>Your email address
        				<input type="email" name="email" />
     				</label>

     				<label>Create a password
        				<input type="password" name="password" />
     				</label>
					
					<button className="button center" type="submit">Create account</button>
				</form>

				<p className="text-center login-register-sub-cta">Already have an account?<br /><a href="#login">Sign in</a></p>

			</div>
		)
	}
})


export default RegisterView