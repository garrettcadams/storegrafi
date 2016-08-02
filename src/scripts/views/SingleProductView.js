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
				<div className="products-wrapper">
					<MainMenu />
					<ProductEditor singleProd={this.state.singleProd} />
				</div>
			)
	}
})

const ProductEditor = React.createClass({


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

	_handleEdit: function(e){
		IG_STORE.data.singleProd.set({
			title: e.target.value
		})
	},

	
	render: function(){
		console.log('render props>>>', this.props.singleProd)
		return (
				<div className="editor-wrapper">
					<h1>Single Product View</h1>

					<form onSubmit={this._handleSave}>
						<div className="form-group">
							<input type="text" placeholder="Enter title" onChange={this._handleEdit} value={this.props.singleProd.get('title')} className="form-control" name="title" />
						</div>

						<div className="form-group">
							<textarea type="text" placeholder="Enter product description" className="form-control" name="description"></textarea>
						</div>

						<div className="form-group">
							<input type="text" placeholder="Enter price" className="form-control" name="price" />
						</div>
						
						<div className="featured-image">
							<img src={this.props.singleProd.get('imageUrl')} />
						</div>

						<button className="btn btn-default" type="submit">Save Product</button>
					</form>
				</div>
			)
		
	}
})



export default SingleProductView