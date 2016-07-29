// import core libraries
import React from 'react'

// import views
import MainMenu from './MainMenu'

//import models
import {User, ProductModel, ProductCollection} from '../models/models'
import ACTIONS from '../actions.js'
import IG_STORE from '../store.js'


const DashboardView = React.createClass ({

	getInitialState: function(){
		return IG_STORE.getData()
	},

	componentWillMount: function(){
		IG_STORE.on('updateContent', ()=>{
			this.setState(IG_STORE.getData())
		})
	},

	componentWillUnmount: function() {
		IG_STORE.off('updateContent')
	},

	render: function(){
		return(
				<div className="dashboard container">
					<h1>Dashboard</h1>
					<MainMenu />
					<InstaConnect productColl={this.state.productColl} allPhotos={this.state.allPhotos} />

				</div>
			)
	}
})

const InstaConnect = React.createClass ({

	_instaHandler: function() {
		ACTIONS.linkToInsta()
	},

	render: function(){
		return(
				<div className="dashboard container">
					<div id="profile"></div>
					<div id="result"></div>
					
					<p>Connect to your Instagram profile by clicking the button below</p>
					<button className="btn btn-default" onClick={this._instaHandler}>Connect with Instagram</button>
					
					<hr/>

					<PhotoContainer allPhotos={this.props.allPhotos} productColl={this.props.productColl} />
				</div>
			)
	}
})

var PhotoContainer = React.createClass ({
	
	_handleSave: function(){
		location.hash = "myproducts"
	},

	render: function (){
		return (
			<div className="photo-container-list">
				<h2>The queried photos</h2>
				{this.props.allPhotos.map((photo, i)=><SinglePhoto singlePhoto={photo} key={i} />)}
				<button className="btn btn-default" onClick={this._handleSave}>Save and continue</button>
			</div>
		)
	}
})

var SinglePhoto = React.createClass ({

	_getSelectedPhotos: function(e){

		var productInfo = {
			title: "Tshirt1",
			description: "Your product description",
			price: 0,
			igId: this.props.singlePhoto.id,
			imageUrl: this.props.singlePhoto.get('images').standard_resolution.url,
			tags: this.props.singlePhoto.get('tags'),
			userId: User.getCurrentUser()._id,
			userEmail: User.getCurrentUser().email,
			likesCount: this.props.singlePhoto.get('likes').count,
		}

		if (e.target.checked){
			ACTIONS.saveProduct(productInfo)
		}

		else {
			ACTIONS.deleteProduct(this.props.singlePhoto.id)
		}

		
		// if (e.target.checked){
		// 	this.cid = IG_STORE.data.productColl.add(this.props.singlePhoto).cid
		// }

		// else {
		// 	IG_STORE.data.productColl.remove(this.cid)
		// }

	},

	render: function(){
		return (
				<div className="col-md-4">
					<img src={this.props.singlePhoto.get('images').standard_resolution.url} />
					<input type="checkbox" onClick={this._getSelectedPhotos} />
				</div>
			)
	}
})



export default DashboardView
