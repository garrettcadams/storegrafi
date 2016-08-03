// import core libraries
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

// import views
import DashboardView from './views/DashboardView'
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import MyProductsView from './views/MyProductsView'
import SingleProductView from './views/SingleProductView'
import UserFrontStore from './views/UserFrontStore'

//import models
import {User} from './models/models'

// console.log('YOLO173')

const app = function() {
  const AppRouter = Backbone.Router.extend ({
  	routes: {
  		'home':'handleHome',
  		'dashboard':'handleDashboard',
  		'login':'handleLogin',
  		'myproducts':'handleMyProducts',
  		'myproducts/:id':'handleSingleView',
      'u/:userName':'handleFrontStore',
      // 'u/:username/:id':'handleFrontProduct',
  		'*redirect':'handleRedirect'
  	},

  	handleDashboard: function(){
  		  ReactDOM.render(<DashboardView />, document.querySelector('.container'))
  	},

  	handleMyProducts: function(){
  		  ReactDOM.render(<MyProductsView />, document.querySelector('.container'))
  	},

  	handleSingleView: function(id){
  		  ReactDOM.render(<SingleProductView id={id} />, document.querySelector('.container'))
  	},

  	handleLogin: function(){
  		  ReactDOM.render(<LoginView />, document.querySelector('.container'))
  	},

    handleFrontStore: function(userName){
        ReactDOM.render(<UserFrontStore userName={userName} />, document.querySelector('.container'))
    },

    // handleFrontProduct: function(){
    //     ReactDOM.render(<UserFrontProduct />, document.querySelector('.container'))
    // },

  	handleRedirect: function(){
  	   console.log('REDIRECT TRIGGERED....')
       location.hash = 'home'
    },

  	initialize: function(){
  		Backbone.history.start()
  		// listen for event on Backbone Router itself
  		//   this.on('route', function(handlerName){
  		// 	if(!User.getCurrentUser()){
  		// 		location.hash = 'login'
  		// 	}
    //     location.hash = 'dashboard'
        
  		// })
  	}
  })
  new AppRouter()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..