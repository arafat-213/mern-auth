import React from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
const App = () => {
	return (
		<Router>
			<div>{/* <NavBar /> */}</div>
			<Switch>
				<Route path='/signup'>
					<SignUp />
				</Route>
				<Route path='/users'></Route>
				<Route path='/'>
					<Login />
				</Route>{' '}
			</Switch>
		</Router>
	)
}

export default App
