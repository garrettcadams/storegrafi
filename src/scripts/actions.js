import {User} from './models/models'
import {ProductModel, ProductCollection} from './models/models'
import {FrontStoreCollection, FrontProductModel} from './models/models'
import {InstaCollection} from './models/models'

import IG_STORE from './store'
import hello from 'hellojs'
import Backbone from 'backbone'
import toastr from 'toastr'

// Intializing hello function for Instagram authorization
hello.init({
        // instagram : "34e9f619c5e3475492e7b2d75f2a9f26" // Instagram dev ID
        instagram : "bd6ad80d1a80435293503c16a2a29555" // Instagram live ID
    },{
        // redirect_uri:'http://localhost:3000' // Local dev
        redirect_uri:'https://storegrafi.herokuapp.com/#dashboard' // Live redirect address
    });


const ACTIONS = {

    //WE WANT TO LOG THE USER IN IMMEDIATELY AFTER THEY REGISTER (AS LONG AS THEY REGISTER SUCCESFULLY) THE FIRST METHOD REGISTERS AND THE SECOND LOGS THEM IN
    //.then takes two callback functions, both of these methods use that to create either a 'success' function or a 'failure' function
    registerUser: function(userObj) { //input name doesn't actually matter, we just named it the same as the object that is getting passsed in for our own peace of mind
        User.register(userObj).then(
            (responseData) => {
                ACTIONS.logUserIn(userObj.email, userObj.password)
                location.hash = 'dashboard'
            },
            (error) => {
                toastr.error('There was an error during registration.')
                console.log(error)
            }
        )

    },

    logUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
                toastr.success(`user ${email} logged in!`)
                console.log(responseData)
                location.hash = 'dashboard'
            },
            (error) => {
                toastr.error('Sorry, try again!')
                console.log(error)
            }
        )
    },

    logUserOut: function() { 
        User.logout().then(
            () => location.hash = 'login'
        )
    },

    saveProduct: function(productObj) {
        let pModel = new ProductModel(productObj)
        pModel.save().then(
            (responseData) => {
                toastr.success(`Instagram Record: <${productObj.igId}> saved!`)
                console.log(responseData)

                IG_STORE.data.productColl.add(pModel)
            },
            (err) => {
                toastr.error('oh noes! no products for you...')
                console.log(err)
            })
    },

    updateProduct: function(newPropsObj){
        // Update the model on state and save to database again
        console.log(newPropsObj)
        IG_STORE.set('singleProd', newPropsObj) 

    },

    deleteProduct: function(igIdVal){
        console.log(igIdVal)
        let singleProduct = IG_STORE.data.productColl.find({igId: igIdVal})
        console.log('Product to be deleted', singleProduct)
        singleProduct.destroy().then(

            (responseData) => {
                toastr.info(`Instagram Record: <${singleProduct.get('igId')}> deleted!`)
                console.log(responseData)
                console.log('new collection after delete:', IG_STORE.data.productColl)
            },
            (err) => {
                toastr.error('oh noes! no products for you...')
                console.log(err)
            })
    },

    fetchUserProducts: function(){
        IG_STORE.data.productColl.fetch().then(
            (responseData) => {
                toastr.info('successful fetch!')
                console.log(responseData)
            },
            (err) => {
                toastr.error('couldnt fetch user insta products')
                console.log(err)
            })
    },

    fetchFrontStoreProducts: function(userName){

        IG_STORE.data.frontStoreColl.fetch({
            url: '/api/store/' + userName
        }).then(
            (responseData) => {
                toastr.info('successful fetch!')
                console.log('RESPONSE DATA >>>', responseData)
            },
            (err) => {
                toastr.error('couldnt fetch public store products')
                console.log(err)
            })
    },

    fetchSingleProduct: function(id){
        console.log('id from url', id)
        IG_STORE.data.singleProd.fetch({
            url: 'api/products/' + id
        }).then(
            (responseData) => {
                toastr.info('single product fetched!')
                console.log(responseData)
            },
            (err) => {
                toastr.error('oh noes! no product for you...')
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

        IG_STORE.set('allPhotos', new InstaCollection(photosArray)) 
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