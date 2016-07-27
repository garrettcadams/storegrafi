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
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  products: { type: [String], default: [] }
  createdAt: { type: Date, default: Date.now }

})

// ----------------------
// INSTAGRAM PRODUCTS
// ----------------------

const productSchema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	imageUrl: {type: String},
	tags: {type: [String], default: []},
	authorId: {type: String, required: true},
	likesCount: {type: Number},
})

module.exports = {
  User: createModel('User', usersSchema),
  Product: createModel('Product', productSchema)
}
