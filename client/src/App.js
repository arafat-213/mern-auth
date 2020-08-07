import React from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Activation from './pages/Activation'
import PageNotFound from './pages/PageNotFound'
import Customer from './pages/Customer'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
const App = () => {
	return (
		<Router>
			<div>
				<NavBar />
			</div>
			<Switch>
				<Route path='/signup'>
					<SignUp />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route
					path='/users/activate/:token'
					exact
					render={props => <Activation {...props} />}
				/>
				<Route path='/users/password/forget'>
					<ForgotPassword />
				</Route>
				<Route
					path='/users/password/reset/:token'
					exact
					render={props => <ResetPassword {...props} />}
				/>

				<Route path='/customer'>
					<Customer />
				</Route>

				<Route path='/'>
					{' '}
					<PageNotFound />{' '}
				</Route>
			</Switch>
		</Router>
	)
}

export default App
