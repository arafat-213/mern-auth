import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Login.css'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { authenticate, isAuth } from '../helpers/auth'
import axios from 'axios'
import logo from '../assets/logo.png'

const ResetPassword = ({ match }) => {
	const [formData, setFormData] = useState({
		password1: '',
		password2: '',
		token: ''
	})

	const { password1, password2, token } = formData
	useEffect(() => {
		let token = match.params.token
		if (token) setFormData({ ...formData, token })
	}, [])
	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const submitHandler = async e => {
		e.preventDefault()
		try {
			if (password1 === password2 && password1 && password2) {
				const res = await axios.put(
					`${process.env.REACT_APP_API_URL}/password/reset`,
					{
						newPassword: password1,
						resetPasswordLink: token
					}
				)
				toast.success(res.data.message)
			}
		} catch (error) {
			toast.error(error.response.data.error)
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
						It's okay to not remember things at times.
					</h2>
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
						<Form.Group controlId='formPassword1'>
							<Form.Control
								type='password'
								placeholder='Enter new password'
								name='password1'
								value={password1}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId='formPassword2'>
							<Form.Control
								type='password'
								placeholder='Re-enter new password'
								name='password2'
								value={password2}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Button
							onClick={submitHandler}
							variant='primary'
							className='w-100'>
							Save new password
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default ResetPassword
