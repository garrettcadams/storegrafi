import React from 'react'
import MainMenu from './MainMenu'

const HomeView = React.createClass ({
	render: function(){
		return(
				<div id="home">

					<div className="row expanded top-home-bar">
						<div className="small-12 medium-8 large-8 columns">
							<a><img className="home-logo" src="../images/home-logo.png" alt="Storegrafi logo" /></a>
						</div>
						<div id="home-nav" className="small-12 medium-4 large-4 columns">
							<div className="cta-links">
								<a className="button register" href="#register">Sign up for free</a>
								<a className="login" href="#login">Log in</a>
							</div>
						</div>
					</div>

					<div id="hero">
						<div className="row">
							<div className="medium-8 large-6 columns">
								<h1>The ecommerce platform for Instagram creators.</h1>
								<p>Create an online store for free with the power of Instagram. No monthly charges or setup fees. <em>Ever</em>. Only pay a 5% transaction fee when you make a sale.</p>
								<a className="button large" href="#register">Get started now</a>
							</div>
						</div>

					</div>

					<div id="footer" className="row">
						<div className="large-8 large-centered columns">
							<p className="text-center">Storegrafi is an open source project by <a href="mailto:johnludena@gmail.com">John Ludena</a>. Some rights reserved. View this project on <a href="https://github.com/johnludena/storegrafi" target="_blank">GitHub</a>.</p>
						</div>
					</div>


				</div>
			)
	}
})

export default HomeView