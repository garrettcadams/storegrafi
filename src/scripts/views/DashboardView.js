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
				<div id="dashboard">
					<div className="expanded row">
						<div id="navigation" className="small-6 medium-2 columns">
							<a id="logo" href="#dashboard">Storegrafi<br />(Beta)</a>
							<MainMenu />
						</div>

						<div id="app-view" className="small-6 medium-10 columns">
							<h1>Dashboard</h1>
							<InstaConnect productColl={this.state.productColl} allPhotos={this.state.allPhotos} />
						</div>
					</div>
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
					<button className="button" onClick={this._instaHandler}>Connect with Instagram</button>
					
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
			<div className="row small-up-1 medium-up-2 large-up-3">
				{this.props.allPhotos.map((photo, i)=><SinglePhoto singlePhoto={photo} key={i} />)}
				<button className="button" onClick={this._handleSave}>Save and continue</button>
			</div>
		)
	}
})

var SinglePhoto = React.createClass ({

	_getSelectedPhotos: function(e){

		var productInfo = {
			title: " ",
			description: " ",
			price: 0,
			imageUrl: this.props.singlePhoto.get('images').standard_resolution.url,
			likesCount: this.props.singlePhoto.get('likes').count,
			tags: this.props.singlePhoto.get('tags'),
			instaId: this.props.singlePhoto.id,
			userId: User.getCurrentUser()._id,
			userName: User.getCurrentUser().userName,
		}

		if (e.target.checked){
			ACTIONS.saveProduct(productInfo)
		}

		else {
			ACTIONS.deleteProduct(this.props.singlePhoto.id)
		}

	},

	render: function(){
		return (
				<div className="column">
					<img src={this.props.singlePhoto.get('images').standard_resolution.url} />
					<input type="checkbox" onClick={this._getSelectedPhotos} />
				</div>
			)
	}
})



export default DashboardView
