import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Login.css'
import logo from '../assets/logo.png'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { authenticate, isAuth } from '../helpers/auth'
import axios from 'axios'

const Login = ({ history }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		keepLoggedIn: false
	})

	const { email, password, keepLoggedIn } = formData
	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const checkBoxHandler = e => {
		setFormData({ ...formData, keepLoggedIn: !keepLoggedIn })
		console.log(keepLoggedIn)
	}

	const submitHandler = async e => {
		e.preventDefault()
		if (email !== '' && password !== '') {
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_API_URL}/login`,
					{
						email,
						password
					}
				)
				authenticate(res, () => {
					setFormData({
						...formData,
						email: '',
						password: ''
					})
					// check user role and redirect to intended page
					isAuth() && isAuth().role === 'admin'
						? history.push('/admin')
						: history.push('/customer')
					toast.success('Signed in successfully')
				})
			} catch (error) {
				console.log(error)
				// toast.error(error.response.data.error)
			}
		} else {
			toast.error('Please fill all the fields')
		}
	}
	return (
		<Container fluid className='w-100'>
			<ToastContainer />
			<Row>
				<Col
					md='6'
					className='d-flex flex-column align-items-center justify-content-center left-panel'>
					<h2 className='text-white text-center'>
						Welcome to Food<span className='hub'>Hub</span>
						{/* Welcome to Foodie */}
					</h2>
					<h5 className='text-white text-center mt-2'>
						Get your favourite food delivered on your doorstep!
					</h5>
				</Col>
				<Col
					md='6'
					className='d-flex flex-column justify-content-center align-items-center right-panel'>
					<Form className='form-container p-4 mt-3 border shadow'>
						<img
							src={logo}
							alt='Logo'
							className='logo shadow rounded-circle d-block mx-auto'
						/>
						<Form.Group controlId='formEmail'>
							<Form.Control
								type='text'
								placeholder='Email'
								name='email'
								value={email}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId='formPassword'>
							<Form.Control
								type='password'
								placeholder='Password'
								autoComplete='on'
								name='password'
								value={password}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId='formKeepLoggedinCheckbox'>
							<Form.Check
								type='checkbox'
								label='Keep me logged in'
								name='keepLoggedIn'
								value={keepLoggedIn}
								onChange={checkBoxHandler}
							/>
						</Form.Group>
						<Form.Text className='text-left text-primary text-underline text-center mb-2'>
							Forgot password?
							<Link to='/users/password/forget'> Reset it! </Link>
						</Form.Text>
						<Button
							variant='primary'
							className=' w-100'
							onClick={submitHandler}>
							Log in
						</Button>{' '}
						<hr />
						<Link to='/signup'>
							<Button variant='primary' className=' w-100'>
								Sign up
							</Button>{' '}
						</Link>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default withRouter(Login)
