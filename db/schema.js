const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  userName: {type: String, required: true},

  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  createdAt: { type: Date, default: Date.now }

})

// ----------------------
// INSTAGRAM PRODUCT SCHEMA
// ----------------------

const productSchema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	imageUrl: {type: String},
  likesCount: {type: Number},
	tags: {type: [String], default: []},
  instaId: {type: [String], default: []},
	userId: {type: String, required: true},
  userName: {type: String, required: true},
})

module.exports = {
  User: createModel('User', usersSchema),
  Product: createModel('Product', productSchema)
}
