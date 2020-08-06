import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import jwt from 'jsonwebtoken'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Activation = ({ match }) => {
	const [formData, setFormData] = useState({
		name: '',
		token: '',
		show: true
	})

	const { name, token, show } = formData
	useEffect(() => {
		// Get token from req url param
		let token = match.params.token
		if (token) {
			let name = jwt.decode(token)
			setFormData({ ...formData, name, token })
		}
	}, [])

	const submitHandler = async e => {
		e.preventDefault()
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/activation`,
				{
					token
				}
			)
			setFormData({ ...formData, show: false })
			toast.success(res.data.message)
			console.log(res.error)
		} catch (error) {
			// toast.error('Something went wrong')
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
					<h2 className='text-white text-center'>Welcome home</h2>
					<h5 className='text-white text-center mt-2'>
						You are just one step away from joining the Hub family.
					</h5>
				</Col>
				<Col
					md='6'
					className='d-flex flex-column justify-content-center align-items-center right-panel'>
					<Form className='form-container p-4 mt-3 border shadow'>
						<Button
							onClick={submitHandler}
							variant='success'
							className='w-100'>
							Activate my account
						</Button>
						<h3 className='text-center'>OR</h3>
						<Link to='/signup'>
							<Button variant='danger' className='w-100'>
								Sign up again
							</Button>
						</Link>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default Activation
