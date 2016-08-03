import React from 'react'
import MainMenu from './MainMenu'

const HomeView = React.createClass ({
	render: function(){
		return(
				<div id="home">
					<div id="hero" className="expanded row">
						<div className="medium-12 medium-centered columns">
							<div className="pitch">
								<h1>Storegrafi</h1>
								<h2>Turn your Instagram photos into a real ecommerce store</h2>
								<a className="button large" href="#login">Get started</a>
							</div>
							
						</div>
					</div>
				</div>
			)
	}
})

export default HomeView