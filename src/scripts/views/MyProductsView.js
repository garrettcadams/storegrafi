import React from 'react'
import MainMenu from './MainMenu'

//import models
import {User, ProductModel, ProductCollection} from '../models/models'
import ACTIONS from '../actions.js'
import IG_STORE from '../store.js'

const MyProductsView = React.createClass ({
	
	getInitialState: function(){
		return IG_STORE.getData()
	},

	componentWillMount: function(){
			
		ACTIONS.fetchUserProducts()
		IG_STORE.on('updateContent', ()=>{
			this.setState(IG_STORE.getData())
		})
	},

	componentWillUnmount: function() {
		IG_STORE.off('updateContent')
	},

	render: function(){
		
		return(
				<div className="products-wrapper">
					<h1>My Products View</h1>
					<MainMenu />
					<ProductsContainer myProducts={this.state.productColl} />
				</div>
			)
	}
})

const ProductsContainer = React.createClass ({
	
	render: function(){
		
		return(
				<div className="products-container">
					<table className="table table-hover">
						<tbody>
							<tr>
								<th className="product-image">Product Image</th>
								<th className="product-title">Product Title</th>
								<th className="product-price">Product Price</th>
							</tr>

							{this.props.myProducts.map((product, i)=><SingleProduct product={product} key={i}/>)}
						</tbody>
					</table>
				</div>
			)
	}
})

const SingleProduct = React.createClass ({
	
	_handleViewSwitch: function(){
		location.hash = 'myproducts/' + this.props.product.id
	},

	render: function(){
		return (
				<tr onClick={this._handleViewSwitch} className="product-row">
					<td><img src={this.props.product.get('imageUrl')} width="50" /></td>
					<td>{this.props.product.get('title')}</td>
					<td>{this.props.product.get('price')}</td>
				</tr>
			)
	}
})

export default MyProductsView