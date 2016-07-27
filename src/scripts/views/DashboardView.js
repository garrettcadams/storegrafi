// import core libraries
import React from 'react'
import hello from 'hellojs'
// import $ from 'jquery'
// import Bootstrap from 'bootstrap'

// import views
import MainMenu from './MainMenu'

//import models
import {User} from '../models/models'

var selectedProducts = []

// HelloJS modules needed for Instagram authorization
hello.init({
	instagram : "34e9f619c5e3475492e7b2d75f2a9f26"
	},{
		redirect_uri:'http://localhost:3000/#dashboard'
	});

hello.on('auth.login', function(auth) {
	window.auth = auth
	window.insta = hello(auth.network)

	// Call user information, for the given network
	hello(auth.network).api('me').then(function(r) {
	// 	// Inject it into the container
	// 	var label = document.getElementById('profile_' + auth.network);
	// 	if (!label) {
	// 		label = document.createElement('div');
	// 		label.id = 'profile_' + auth.network;
	// 		document.getElementById('profile').appendChild(label);
	// 	}
	// 	label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
	});
});


const DashboardView = React.createClass ({
	render: function(){
		console.log('current user:', User.getCurrentUser())
		return(
				<div className="dashboard container">
					<h1>Dashboard</h1>
					<MainMenu />
					<InstaConnect />

				</div>
			)
	}
})

const InstaConnect = React.createClass ({
	getInitialState: function(){
		return {
			photoList: []
		}
	},

	_profileHandler: function(r){
		var profile = document.getElementById( 'profile' );

		profile.innerHTML = "<img src='"+ r.thumbnail + "' width=24/>Connected to instagram as " + r.name;
	},

	_errorHandler: function(){
		console.log('shit just hit the fan... (ie there was an error)')
	},

	_photosHandler: function(apiResponse){
		var photosArray = apiResponse.data	
		console.log('apiresponse data insta >>>', photosArray)	
		
		this.setState({
			photoList: photosArray
		})
	},

	_linkToInsta: function(){
		// Define an instagram instance
		var instagram = hello( 'instagram' );

		// Trigger login to instagram
		instagram.login().then(()=>{

			// Get Profile
			instagram.api('me').then(this._profileHandler, this._errorHandler);

			// Get user photos
			instagram.api('me/photos').then(this._photosHandler, this._errorHandler );

		}, this._errorHandler);
	},

	render: function(){
		return(
				<div className="dashboard container">
					<div id="profile"></div>
					<div id="result"></div>
					
					<p>Connect to your Instagram profile by clicking the button below</p>
					<button className="btn btn-default" onClick={this._linkToInsta}>Connect with Instagram</button>
					
					<hr/>

					<PhotoContainer photoList={this.state.photoList} />
				</div>
			)
	}
})

var PhotoContainer = React.createClass ({
	
	_handleSave: function(e){
		console.log('About to save new array>>>', selectedProducts)
	},

	render: function (){
		return (
			<div className="photo-container-list">
				<h2>The queried photos</h2>
				{this.props.photoList.map((photo, i)=><SinglePhoto singlePhoto={photo} key={i} />)}
				<button onClick={this._handleSave}>Save as products</button>
			</div>
		)
	}
})

var SinglePhoto = React.createClass ({

	_getSelectedPhotos: function(e){
		console.log('checked input?', e.target.checked)

		var selectedPic = e.target.checked
		
		// if checkbox is selected, add object to array
		if (selectedPic){
			
			selectedProducts.push(this.props.singlePhoto)
			console.log('YES, add this photo...')
		}

		// otherwise, remove object from array
		else {

			selectedProducts.splice(selectedProducts.indexOf(this.props.singlePhoto), 1)
			console.log('NO, do not add this photo...')
		}

		console.log('New products array is now:', selectedProducts)
	},

	render: function(){
		return (
				<div className="col-md-4 johnnyboy">
					<img src={this.props.singlePhoto.images.standard_resolution.url} />
					<input type="checkbox" onClick={this._getSelectedPhotos} />
				</div>
			)
	}
})



export default DashboardView
