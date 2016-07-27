import React from 'react'
import ACTIONS from '../actions'

const MainMenu = React.createClass ({
	render: function(){
		return(
				<div className="navigation">
					<ul>
						<li><a href="#dashboard">Dashboard</a></li>
						 <li><a href="#" onClick={ACTIONS.logUserOut}>Log Out</a></li>
					</ul>
				</div>
			)
	}
})

export default MainMenu