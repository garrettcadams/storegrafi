import React from 'react'
import MainMenu from './MainMenu'

const MyProductsView = React.createClass ({
	render: function(){
		return(
				<div className="products container">
					<h1>My Products View</h1>
					<MainMenu />
				</div>
			)
	}
})

export default MyProductsView