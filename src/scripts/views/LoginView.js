import React from 'react'
import hello from 'hellojs'

//import views
import MainMenu from './MainMenu'

//import actions
import ACTIONS from '../actions'


const LoginView = React.createClass({

    render: function() {
        return (

        	<div id="dashboard">

				<div className="row">
					
					<div className="medium-6 medium-centered large-4 large-centered columns login-register-box">
						<img className="centered-image" src="../images/logo-icon.png" />
						<h2>Sign in</h2>
						<LoginBox />
					</div>
				</div>
			</div>

            )
    }
})


const LoginBox = React.createClass({
	_handleLogin: function(evt) {
		evt.preventDefault()
		ACTIONS.logUserIn(evt.target.email.value,evt.target.password.value)
	},

	render: function() {
		return (
			<div className="loginBox login container">
				<form onSubmit={this._handleLogin} >
					
					<label>Email address
        				<input className="form-control" type="email" name="email" />
     				</label>

     				<label>Password
        				<input type="password" name="password" />
     				</label>

					<button className="button center" type="submit">Log in</button>
				</form>

				<p className="text-center login-register-sub-cta">Don't have an account yet?<br /><a href="#register">Create a free account now</a></p>
			</div>
			)
	}

})

export default LoginView