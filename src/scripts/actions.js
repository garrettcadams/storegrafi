import {User} from './models/models'
import {InstaModel, InstaCollection} from './models/models'
import IG_STORE from './store'
import hello from 'hellojs'
import Backbone from 'backbone'

// Intializing hello function for Instagram authorization
hello.init({
    instagram : "34e9f619c5e3475492e7b2d75f2a9f26"
    },{
        redirect_uri:'http://localhost:3000'
    });


const ACTIONS = {

    //WE WANT TO LOG THE USER IN IMMEDIATELY AFTER THEY REGISTER (AS LONG AS THEY REGISTER SUCCESFULLY) THE FIRST METHOD REGISTERS AND THE SECOND LOGS THEM IN
    //.then takes two callback functions, both of these methods use that to create either a 'success' function or a 'failure' function
    registerUser: function(userObj) { //input name doesn't actually matter, we just named it the same as the object that is getting passsed in for our own peace of mind
        User.register(userObj).then( () => ACTIONS.logUserIn(userObj.email, userObj.password),
            (error) => {
                alert('FAILURE TO REGISTER')
                console.log(error)
            }
        )

    },

    logUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
                alert(`user ${email} logged in!`)
                console.log(responseData)
                location.hash = 'home' //want the page to re-route to the home page after successfull login
            },
            (error) => {
                alert('FAILURE LOGGING IN')
                console.log(error)
            }
        )
    },

    logUserOut: function() { // we want the page to reroute to the login page after a user has logged out (server keeps track os user being logged in with a 'session')
        User.logout().then(
            () => location.hash = 'login'
        )
    },

    saveProducts: function() {
        console.log('incoming payload array:')
    	var products = IG_STORE.data.productColl
    	Backbone.sync("create", products).then(
    		(responseData) => {
    			alert('products saved!')
    			console.log(responseData)
    		},
    		(err) => {
    			alert('oh noes! no products for you...')
    			console.log(err)
    		})
    },


    saveProduct: function(prodObj) {
        console.log('incoming payload object:', prodObj)
        // var dish = new DishModel(dishObj) 
        // dish.save().then(
        var product = new InstaModel(prodObj)
        product.save().then(
            (responseData) => {
                alert('products saved!')
                console.log(responseData)
            },
            (err) => {
                alert('oh noes! no products for you...')
                console.log(err)
            })
    },

       
    profileHandler: function(r){
        var profile = document.getElementById('profile');

        profile.innerHTML = "<img src='"+ r.thumbnail + "' width=24/>Connected to instagram as " + r.name;
    },

    errorHandler: function(){
        console.log('shit just hit the fan... (ie there was an error)')
    },

    photosHandler: function(apiResponse){
        

        var photosArray = apiResponse.data  
        console.log('photos array >>>', photosArray)

        IG_STORE.set('allPhotos', photosArray) 
        
    },

    linkToInsta: function(){
        // Define an instagram instance
        var instagram = hello( 'instagram' );

        // Trigger login to instagram
        instagram.login().then(()=>{

            // Get Profile
            instagram.api('me').then(this.profileHandler, this.errorHandler);

            // Get user photos
            instagram.api('me/photos').then(this.photosHandler, this.errorHandler );

        }, this.errorHandler);
    },

}

export default ACTIONS