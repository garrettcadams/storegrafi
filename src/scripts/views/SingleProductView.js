import React from 'react'
import MainMenu from './MainMenu'
import toastr from 'toastr'

//import models
import {User, ProductModel, ProductCollection} from '../models/models'
import ACTIONS from '../actions.js'
import IG_STORE from '../store.js'

const SingleProductView = React.createClass ({
	
	getInitialState: function(){
		return IG_STORE.getData()
	},

	componentWillMount: function(){

		console.log('hitting component will mount...')
			
		ACTIONS.fetchSingleProduct(this.props.id)

		IG_STORE.on('updateContent', ()=>{
			this.setState(IG_STORE.getData())
		})
	},

	componentWillUnmount: function() {
		IG_STORE.off('updateContent')
	},

	render: function(){
	
		return(
				
				<div id="myproducts-wrapper">
					<ProductEditor singleProd={this.state.singleProd} />
				</div>
			)
	}
})

const ProductEditor = React.createClass({

	getInitialState: function() {
		return {
			titleVal: null,
			descValue: null,
			priceVal: null,
		}
	},

	componentWillReceiveProps: function(newProps) {
		this.setState({
			titleVal: newProps.singleProd.get('title'),
			descVal: newProps.singleProd.get('description'),
			priceVal: newProps.singleProd.get('price'),
		})
	},

	_handleSave: function(e){
		e.preventDefault()
		IG_STORE.data.singleProd.set({
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			price: e.currentTarget.price.value,
		})

		IG_STORE.data.singleProd.save().then(
            (responseData) => {
                toastr.success("product updated!")
                console.log(responseData)

                IG_STORE.data.productColl.add(pModel)
                location.hash = 'myproducts'
            },
            (err) => {
                toastr.error('oh noes! couldnt update product')
                console.log(err)
            })


	},

	_handleTitleEdit: function(e){
		this.setState({
			titleVal: e.target.value,
		})
	},

	_handleDescEdit: function(e){
		this.setState({
			descVal: e.target.value,
		})
	},

	_handlePriceEdit: function(e){
		this.setState({
			priceVal: e.target.value,
		})
	},

	
	render: function(){
		console.log('render props>>>', this.props.singleProd)
		return (
				<div className="row">

					<div className="medium-6 columns">

						<form onSubmit={this._handleSave}>
							<div className="form-group">
								<input type="text" placeholder="Enter title" onChange={this._handleTitleEdit} value={this.state.titleVal} className="form-control" name="title" />
							</div>

							<div className="form-group">
								<textarea rows="10" type="text" onChange={this._handleDescEdit} value={this.state.descVal} placeholder="Enter product description" className="form-control" name="description"></textarea>
							</div>

							<div className="form-group">
								<input type="text" onChange={this._handlePriceEdit} value={this.state.priceVal} placeholder="Enter dollar amount (e.g. 19.99)" className="form-control" name="price" />
							</div>

							<button className="button large" type="submit">Save Product</button>
						</form>	
					</div>

					<div className="medium-6 columns">
						<div className="featured-image">
							<img src={this.props.singleProd.get('imageUrl')} />
						</div>
					</div>	
				</div>
			)
		
	}
})



export default SingleProductView