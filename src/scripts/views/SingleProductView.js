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
			
		ACTIONS.fetchSingleProduct(this.props.id)

		IG_STORE.on('updateContent', ()=>{
			this.setState(IG_STORE.getData())
		})
	},

	componentWillUnmount: function() {
		IG_STORE.off('updateContent')
	},

	render: function(){
		console.log('ID:', this.props.id)
		console.log('collection info on state', this.state.productColl)
		console.log('model info on state', this.state.singleProd)

		return(
				
				<div id="myproducts">
					<div className="expanded row">
						<div id="navigation" className="small-6 medium-2 columns">
							<a id="logo" href="#dashboard">Storegrafi<br />(Beta)</a>
							<MainMenu />
						</div>

						<div id="app-view" className="small-6 medium-10 columns">
							<h1>Edit Your Product</h1>
							<ProductEditor singleProd={this.state.singleProd} />
						</div>
					</div>
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
		console.log('you pushed the button didnt ya?')
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
		console.log(this.state)
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