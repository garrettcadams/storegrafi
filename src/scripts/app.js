// import core libraries
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

// import views
import DashboardView from './views/DashboardView'
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'

//import models
import {User} from './models/models'

const app = function() {
  const AppRouter = Backbone.Router.extend ({
  	routes: {
  		'home':'handleHome',
  		'dashboard':'handleDashboard',
  		'login':'handleLogin',
  		'*redirect':'handleRedirect'
  	},

  	handleHome: function(){
  		console.log('YOU ARE HERE >>> HOME')
  		ReactDOM.render(<HomeView />, document.querySelector('.container'))
  	},

  	handleDashboard: function(){
  		console.log('YOU ARE HERE >>> DASHBOARD')
  		ReactDOM.render(<DashboardView />, document.querySelector('.container'))
  	},

  	handleLogin: function(){
  		console.log('YOU ARE HERE >>> LOGIN')
  		ReactDOM.render(<LoginView />, document.querySelector('.container'))
  	},

  	handleRedirect: function(){
  		location.hash = 'home'
  	},

  	initialize: function(){
  		Backbone.history.start()
  		// listen for event on Backbone Router itself
		this.on('route', function(handlerName){
			if(!User.getCurrentUser()){
				location.hash = 'login'
			}
		})
  	}
  })
  new AppRouter()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..