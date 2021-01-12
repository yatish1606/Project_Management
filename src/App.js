import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AnimatedRoute } from 'react-router-transition'
import Sidebar from './components/Sidebar.jsx'
import Project from './components/Project'
import Dashboard from './components/Dashboard'
import NewProject from './components/NewProject'
import Home from './components/Home'
import './css/global.css'
import Modal from 'react-modal'

Modal.setAppElement('#root')


const AppRouter = () => {

	return (
		<div>
			
			<Router>
				<Switch>
					{/* <Route path="/registerlogin" component={Register}/> */}
					<Route path="/" exact render={(props) => <Home {...props}/>}/>
					<div>
					{/* <AnimatedRoute
						atEnter={{ offset: -100 }}
						atLeave={{ offset: -100 }}
						atActive={{ offset: 0 }}
						mapStyles={(styles) => ({
						  transform: `translateX(${styles.offset}%)`,
						})}
						className="switch-wrapper"
					> */}
					
					{/* <AnimatedRoute path="/dashboard" exact render={(props) => <Home {...props}/>} atEnter={{ offset: -100 }} atLeave={{ offset: -100 }} atActive={{ offset: 0 }} />
					<AnimatedRoute path="/project" exact render={(props) => <Project {...props}/>} atEnter={{ offset: 100 }} atLeave={{ offset: -100 }} atActive={{ offset: 0 }} mapStyles={(styles) => ({transform: `translateX(${styles.offset*5}%)`,})}/>
					<AnimatedRoute path="/project/new" exact render={(props) => <NewProject {...props}/>} atEnter={{ offset: 100 }} atLeave={{ offset: 1000 }} atActive={{ offset: 0 }} /> */}
					<Route path="/dashboard" exact render={(props) => <Dashboard {...props}/>}/>
					<Route path="/project" exact render={(props) => <Project {...props}/>}/>
					<Route path="/project/new" exact render={(props) => <NewProject {...props}/>}/>
					<Route path="*" render={(props) => <Sidebar {...props}/>}/>
					{/* </AnimatedRoute> */}
					</div>
				</Switch>
				
			</Router>
			
		</div>
	)
}

export default AppRouter
