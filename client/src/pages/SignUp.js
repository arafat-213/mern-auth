import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Login.css'
import logo from '../assets/logo.png'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { authenticate, isAuth } from '../helpers/auth'
import { ToastContainer, toast } from 'react-toastify'

const SignUp = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password1: '',
		password2: ''
	})

	const { name, email, password1, password2 } = formData

	// Change handler
	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	// Submit handler
	const submitHandler = async e => {
		e.preventDefault()
		if (name && email && password1) {
			if (password1 === password2) {
				setFormData({ ...formData, textChange: 'Submitting' })

				try {
					const res = await axios.post(
						`http://localhost:5000/api/register`,
						{
							name,
							email,
							password: password1
						}
					)

					setFormData({
						...formData,
						name: '',
						email: '',
						password1: '',
						password2: '',
						textChange: 'Submitted'
					})
					toast.success(res.data.message)
				} catch (error) {
					setFormData({
						...formData,
						name: '',
						email: '',
						password1: '',
						password2: '',
						textChange: 'Sign Up'
					})
					toast.error(error.response.data.errors)
				}
			} else {
				toast.error("Passwords don't matches")
			}
		} else {
			toast.error('Please fill all fields')
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
					<Form className='form-container p-4 mt-3 borde shadow'>
						<img
							src={logo}
							alt='Logo'
							className='logo shadow rounded-circle d-block mx-auto'
						/>
						<Form.Group controlId='formName'>
							<Form.Control
								type='text'
								value={name}
								name='name'
								onChange={changeHandler}
								placeholder='Name'
							/>
						</Form.Group>
						<Form.Group controlId='formEmail'>
							<Form.Control
								type='text'
								placeholder='Email'
								value={email}
								name='email'
								autoComplete='on'
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId='formPassword1'>
							<Form.Control
								type='password'
								placeholder='Password'
								value={password1}
								name='password1'
								autoComplete='on'
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId='formPassword2'>
							<Form.Control
								type='password'
								placeholder='Confirm password'
								value={password2}
								name='password2'
								autoComplete='on'
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Text className='text-left text-primary text-underline text-center mb-2'>
							Already a member?
							<Link to='/'> Click here to Log in</Link>
						</Form.Text>
						<Button
							onClick={submitHandler}
							variant='danger'
							className='w-100'>
							Sign up
						</Button>{' '}
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default SignUp
