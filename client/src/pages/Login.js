import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Login.css'
import logo from '../assets/logo.png'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const Login = () => {
	return (
		<Container fluid className='border w-100'>
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
					<img src={logo} alt='Logo' className='logo text-center' />
					<Form className='form-container p-4 mt-3 borde shadow'>
						<Form.Group controlId='formMobile'>
							{/* <Form.Label>Phone Number</Form.Label> */}
							<Form.Control
								type='text'
								placeholder='Enter Mobile Number'
							/>
							<Form.Text className='text-left text-muted'>
								We will never share your phone number with those
								credit card guys!
							</Form.Text>
						</Form.Group>
						<Form.Group controlId='formPassword'>
							{/* <Form.Label>Password </Form.Label> */}
							<Form.Control
								type='password'
								placeholder='Password'
							/>
						</Form.Group>
						<Form.Group controlId='formKeepLoggedinCheckbox'>
							<Form.Check type='checkbox' label='Keep me in' />
						</Form.Group>
						<Form.Text className='text-left text-primary text-underline text-center mb-2'>
							New here? Join the family by signing up
						</Form.Text>
						<Button variant='outline-danger' className='w-100'>
							Sign in
						</Button>{' '}
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default Login
