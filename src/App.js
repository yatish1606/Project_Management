import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { UserProvider } from './components/UserProvider'
import { AuthProvider } from './components/AuthProvider'

import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import NewProject from './components/NewProject'
import Project from './components/Project'
import Register from './components/Register'
import Sidebar from './components/Sidebar.jsx'

import './css/global.css'

import Modal from 'react-modal'

Modal.setAppElement('#root')


const AppRouter = () => {

	return (
		<div>
			<AuthProvider>
			<ThemeProvider>
			<UserProvider>
				<Router>
					<Switch>
						
						<Route path="/" exact render={(props) => <Home {...props}/>}/>
						<Route path="/login" exact render={(props) => <Login {...props}/>}/>
						<Route path="/register" exact render={(props) => <Register {...props}/>}/>
						
						<div>
						
							<Route path="/dashboard" exact render={(props) => <Dashboard {...props}/>}/>
							<Route path="/project" exact render={(props) => <Project {...props}/>}/>
							<Route path="/project/new" exact render={(props) => <NewProject {...props}/>}/>
							<Route path="*" render={(props) => <Sidebar {...props}/>}/>
						
						</div>

					</Switch>
					
				</Router>
			</UserProvider>
			</ThemeProvider>
			</AuthProvider>
		</div>
	)
}

export default AppRouter
