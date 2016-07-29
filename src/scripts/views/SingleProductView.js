import React from 'react'
import MainMenu from './MainMenu'

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
					 <h1>Product ID: {this.state.singleProd.get('_id')}</h1>
					 <img src={this.state.singleProd.get('imageUrl')} />
				</div>
			)
	}
})



export default SingleProductView