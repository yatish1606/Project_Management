import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx'
import Project from './components/Project'
import Home from './components/Home'


const AppRouter = () => {

	return (
		<div>
			
			<Router>
				<Switch>
					{/* <Route path="/registerlogin" component={Register}/> */}
					
					<div>
					
					<Route path="/dashboard" exact render={(props) => <Home {...props}/>}/>
					<Route path="/project" exact render={(props) => <Project {...props}/>}/>
					<Route path="*" render={(props) => <Sidebar {...props}/>}/>

					</div>
				</Switch>
				
			</Router>
			
		</div>
	)
}

export default AppRouter
