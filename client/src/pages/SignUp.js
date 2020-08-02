import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Login.css'
import logo from '../assets/logo.png'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignUp = () => {
	const [formName, setFormName] = useState('')
	const [formEmail, setFormEmail] = useState('')
	const [formPassword, setFormPassword] = useState('')
	return (
		<Container fluid className='w-100'>
			<Row>
				<Col
					border
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
					border
					md='6'
					className='d-flex flex-column justify-content-center align-items-center right-panel'>
					<Form className='form-container p-4 mt-3 borde shadow'>
						<img
							src={logo}
							alt='Logo'
							className='logo shadow rounded-circle d-block mx-auto'
						/>
						<Form.Group controlId='formName'>
							<Form.Control type='text' placeholder='Name' />
						</Form.Group>
						<Form.Group controlId='formEmail'>
							<Form.Control type='text' placeholder='Email' />
						</Form.Group>
						<Form.Group controlId='formPassword'>
							<Form.Control
								type='password'
								placeholder='Password'
							/>
						</Form.Group>
						<Form.Text className='text-left text-primary text-underline text-center mb-2'>
							Already a member?
							<Link to='/'> Click here to Log in</Link>
						</Form.Text>
						<Button variant='danger' className='w-100'>
							Sign up
						</Button>{' '}
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default SignUp
