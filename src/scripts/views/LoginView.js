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
					<div className="small-6 medium-6 columns">
						<h2>Create a new account</h2>
						<RegisterBox />
					</div>

					<div className="small-6 medium-6 columns">
						<h2>Log in</h2>
						<LoginBox />
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
					<div className="form-group">
						<input type="text" name="userName" className="form-control" placeholder="Enter a username" />
					</div>
					
					<div className="form-group">
						<input type="email" name="email" className="form-control" placeholder="enter your email" />
					</div>

					<div className="form-group">
						<input type="password" name="password" className="form-control" placeholder="enter a password" />
					</div>
					
					<button className="button" type="submit">Sign up</button>
				</form>
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
					<div className="form-group">
						<input className="form-control" type="email" name="email" className="form-control" placeholder="enter your email" />
					</div>

					<div className="form-group">
						<input type="password" name="password" className="form-control" placeholder="enter a password" />
					</div>

					<button className="button" type="submit">Log in</button>
				</form>
			</div>
			)
	}

})

export default LoginView