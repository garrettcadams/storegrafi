import React from 'react'
import hello from 'hellojs'

//import views
import MainMenu from './MainMenu'

//import actions
import ACTIONS from '../actions'


const LoginView = React.createClass({

    render: function() {
        return (
            <div className="loginView">
                <h1>Login</h1>
                <RegisterBox />
                <LoginBox />
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
			name: evt.currentTarget.userName.value
		})
		
	},

	render: function() {
		return (
			<div className="loginBox register container">
				<form onSubmit={this._handleRegister} >
					<h3>Register</h3>
					<div className="form-group">
						<input type="text" name="userName" className="form-control" placeholder="please enter your name" />
					</div>
					
					<div className="form-group">
						<input type="email" name="email" className="form-control" placeholder="enter your email" />
					</div>

					<div className="form-group">
						<input type="password" name="password" className="form-control" placeholder="enter a password" />
					</div>
					
					<button className="btn btn-default" type="submit">sign up!</button>
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
					<h3>Log in</h3>
					<div className="form-group">
						<input className="form-control" type="email" name="email" className="form-control" placeholder="enter your email" />
					</div>

					<div className="form-group">
						<input type="password" name="password" className="form-control" placeholder="enter a password" />
					</div>

					<button className="btn btn-default" type="submit">log in!</button>
				</form>
			</div>
			)
	}

})

export default LoginView