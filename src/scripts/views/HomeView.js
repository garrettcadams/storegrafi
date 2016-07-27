import React from 'react'
import MainMenu from './MainMenu'

const HomeView = React.createClass ({
	render: function(){
		return(
				<div className="home container">
					<h1>Homepage</h1>
					<MainMenu />
				</div>
			)
	}
})

export default HomeView