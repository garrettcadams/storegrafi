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
  createdAt: { type: Date, default: Date.now },

  // All required Stripe user info for making charges
  stripe_publishable_key: { type: String},
  stripe_user_id: { type: String},
  refresh_token: { type: String},
  access_token: { type: String},
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
  instaId: {type: String},
	userId: {type: String, required: true},
  userName: {type: String, required: true},
  stripePubKey: { type: String},
  stripeId: { type: String},
  stripeRefreshToken: { type: String},
  stripeToken: { type: String},
})

module.exports = {
  User: createModel('User', usersSchema),
  Product: createModel('Product', productSchema)
}
