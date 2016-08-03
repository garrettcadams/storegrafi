import React from 'react'
import MainMenu from './MainMenu'

const HomeView = React.createClass ({
	render: function(){
		return(
				<div id="home">
					<div className="expanded row">
						<div className="medium-12 medium-centered columns">
							<h1>Turn your Instagram photos into a real ecommerce store</h1>
							<a className="button large" href="#login">Get started</a>
						</div>
					</div>
				</div>
			)
	}
})

export default HomeView