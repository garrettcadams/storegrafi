// import core libraries
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {init} from './utils'

// import views
import DashboardView from './views/DashboardView'
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import MyProductsView from './views/MyProductsView'
import SingleProductView from './views/SingleProductView'
import UserFrontStore from './views/UserFrontStore'
import SettingsView from './views/SettingsView'
import StripeConfirmation from './views/StripeConfirmation'

//import models
import {User} from './models/models'

console.log('YOLO175') // inside joke

const app = function() {
  const AppRouter = Backbone.Router.extend ({
  	routes: {
  		'home':'handleHome',
  		'dashboard':'handleDashboard',
  		'login':'handleLogin',
  		'myproducts':'handleMyProducts',
  		'myproducts/:id':'handleSingleView',
      'settings':'handleStoreSettings',
      'confirmStripe?:params': 'handleStripeConfirm',
      'u/:userName':'handleFrontStore',
      // 'u/:username/:id':'handleFrontProduct',
  		'*redirect':'handleRedirect'
  	},

    handleLogin: function(){

        if(!User.getCurrentUser()){
          ReactDOM.render(<LoginView />, document.querySelector('.container'))
        }

        else {
           location.hash = 'dashboard'
        }  
    },

    handleHome: function(){
        ReactDOM.render(<HomeView />, document.querySelector('.container'))
    },

    handleStoreSettings: function(){
        ReactDOM.render(<SettingsView />, document.querySelector('.container'))
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

    handleStripeConfirm: function(params){
        ReactDOM.render(<StripeConfirmation params={params} />, document.querySelector('.container'))
    },

    handleFrontStore: function(userName){
        ReactDOM.render(<UserFrontStore userName={userName} />, document.querySelector('.container'))
    },


  	handleRedirect: function(){
  	   console.log('REDIRECT TRIGGERED....')
       location.hash = 'home'
    },

  	initialize: function(){
  		Backbone.history.start()
  	}
  })
  new AppRouter()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..