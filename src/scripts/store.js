import Backbone from 'backbone'
import _ from 'underscore'
import {InstaModel, InstaCollection} from './models/models'

const IG_STORE = _.extend(Backbone.Events, {
	data: {
		collection: new InstaCollection()
	},

	emitChange: function() {
		this.trigger('updateContent')
	},

	getData: function(){
		return _.clone(this.data)
	},

	setStore: function(storeProp, payload) {
		// Check to make sure your store has morals (doesn't accept just any inputs...)
		if (typeof this.data[storeProp] === 'undefined') {
			throw Error(`${storeProp} property not on the store, make sure to declare`)
		}

		this.data[storeProp] = payload
		this._emitChange
	},

	initialize: function(){
		// Start listening (pub/sub) from the very get-go, so with any sync/update, emitChange
		// function will fire
		this.data.collection.on('sync update', this._emitChange.bind(this))
	}
})

IG_STORE._initialize()

export default IG_STORE