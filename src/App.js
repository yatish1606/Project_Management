import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx'
import Project from './components/Project'


const AppRouter = () => {

	return (
		<div>
			
			<Router>
				<Switch>
					{/* <Route path="/registerlogin" component={Register}/> */}
					
					<div>
					
            <Route path="/" render={(props) => <Project {...props}/>}/>
            <Route path="*" render={(props) => <Sidebar {...props}/>}/>

					</div>
				</Switch>
				
			</Router>
			
		</div>
	)
}

export default AppRouter
