import _ from 'underscore'
import Backbone from 'backbone'
import {ProductModel, ProductCollection} from './models/models'
import {FrontStoreCollection, FrontProductModel} from './models/models'
import {InstaCollection} from './models/models'

const IG_STORE = _.extend(Backbone.Events, {
	data: {
		productColl: new ProductCollection(),
		frontStoreColl: new FrontStoreCollection(),
		allPhotos: new InstaCollection(),
		frontProductMod: new FrontProductModel(),
		singleProd: new ProductModel(),
		currentStore: ''
	},

	emitChange: function() {
		this.trigger('updateContent')
	},

	getData: function(){
		return _.clone(this.data)
	},

	set: function(key, val) {
		// Check to make sure your store has morals (doesn't accept just any inputs...)
		if (this.data[key] === undefined) {
			throw Error(`${key} property not on the STORE, make sure to declare`)
		}

		this.data[key] = val
		this.emitChange()
	},

	initialize: function(){
		// Start listening (pub/sub) from the very get-go, so with any sync/update, emitChange
		// function will fire
		this.data.productColl.on('sync update reset', this.emitChange.bind(this))
		this.data.allPhotos.on('sync update reset', this.emitChange.bind(this))
		this.data.singleProd.on('sync update reset', this.emitChange.bind(this))
		this.data.frontStoreColl.on('sync update reset', this.emitChange.bind(this))
		this.data.frontProductMod.on('sync update reset', this.emitChange.bind(this))


	}
})

IG_STORE.initialize()

export default IG_STORE