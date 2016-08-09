let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Product = require('../db/schema.js').Product



// USER ROUTES
  
apiRouter
  .get('/users', function(req, res){
    User.find(req.query , "-password", function(err, results){
      if(err) return res.json(err) 
      res.json(results)
    })
  })

apiRouter
  .get('/users/:_id', function(req, res){
    User.findById(req.params._id, "-password", function(err, record){
      if(err || !record ) return res.json(err) 
      res.json(record)
    })
  })
  .put('/users/:_id', function(req, res){
    User.findById(req.params._id, "-password",function(err, record){
      if(err || !record) return res.json(err)
      let recordWithUpdates = helpers.updateFields(record, req.body)
      recordWithUpdates.save(function(err){
        if(err) return res.json(err) 
        res.json(recordWithUpdates)
      })
    })
  })
  .delete('/users/:_id', function(req, res){
    User.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })  
  })



// Get all user products (ADMIN VIEW)
apiRouter.get('/products', function(req, res) {
    if (req.user){ // check to see if there is a logged in user
      console.log('current user ID to get filtered>>>', req.user._id)
      Product.find({userId: req.user._id}, function(error, records){
        if(error) {
            res.send(error)
        }
        
        res.json(records)
      }) 
    }
})


// Get a single product by ID (ADMIN VIEW)
apiRouter.get('/products/:_id',function(req,res) {
  Product.findById(req.params._id, function(error,record) {
    if(error) {
      res.send(error)
    }
    res.json(record)
  })
})

//Update product
apiRouter.put('/products/:_id', function(req,res){
  Product.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(error, record){
    if(error) {
        res.send(error) 
    } 
    res.json(record)
  })
})

// Post new product
apiRouter.post('/products', function(req, res){
  console.log(req.body)
  // find out what mongoose method allows us to persist an array of models all at once.
  var product = new Product(req.body)
  product.save(function(error){
    if(error) {
      res.send(error)
    }
    res.json(product)
  })
})

// Delete a product
apiRouter.delete('/products/:_id', function(req, res){
  Product.remove({ _id: req.params._id}, (err) => {
    if(err) return res.json(err)
    res.json({
      msg: `record  successfully deleted`,
      _id: req.params._id
    })
  })  
})

// Get all user products (USER VIEW)
apiRouter.get('/store/:userName', function(req, res) {
    console.log('STORE REQUEST PARAMS>>>', req.params)
    Product.find({userName: req.params.userName}, function(error, records){
      if(error) {
          res.send(error)
      }
      res.json(records)
    }) 
})

// apiRouter.post('/dishes', function(request, response) {
//     let dish = new Dish(request.body) //create new instance of schema from a MONGOOSE model
//      request.body is all the information that we have taken from the client side
//      and we send it on the body of the request to the server
//     dish.save(function(error) { //saves to db
//         if(error) {
//             response.send(error)
//         }
//         else {
//             response.json(dish)
//         }
//     })
// })

// apiRouter.put('/dishes/:_id', function(request,response){
//   Dish.findByIdAndUpdate(request.params._id, request.body, function(error, record){
    
//     if(error) {
//         response.send(error) 
//     } 
//     response.json(record)

//   })
// })



//get dishes posted by the logged in user
// apiRouter.get('/user/dishes', function(request, response) {
//     Dish.find({authorId: request.user._id}, function(error, records) { //I want to get all dishes where the author id matches the current id of the user
//         if(error) {
//             response.send(error)
//         }
//         else {
//             response.json(records)
//         }
//     })
// })


module.exports = apiRouter