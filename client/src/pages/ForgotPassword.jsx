import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Login.css'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { authenticate, isAuth } from '../helpers/auth'
import axios from 'axios'
import './Login.css'
import logo from '../assets/logo.png'

const ForgotPassword = () => {
	const [formData, setFormData] = useState({
		email: ''
	})

	const changeHandler = e => {
		setFormData({ ...setFormData, [e.target.name]: e.target.value })
	}

	const submitHandler = async e => {
		e.preventDefault()
		try {
			const res = await axios.put(
				`${process.env.REACT_APP_API_URL}/password/forget`,
				{
					email
				}
			)
			toast.success(res.data.message)
		} catch (error) {
			toast.error(error.response.data.error)
		}
	}
	const { email } = formData
	return (
		<Container fluid className='w-100'>
			<ToastContainer />
			<Row>
				<Col
					md='6'
					className='d-flex flex-column align-items-center justify-content-center left-panel'>
					<h3 className='text-white text-center'>
						It's okay to not remember things at times.
					</h3>
					<h5 className='text-white text-center mt-2'>
						You can reset your password in just few steps.
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
						<Button
							onClick={submitHandler}
							variant='primary'
							className='w-100'>
							Get password reset link
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPassword
