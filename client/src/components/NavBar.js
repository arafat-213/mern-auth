import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
	return (
		<Navbar
			collapseOnSelect
			expand='md'
			bg='light'
			variant='light'
			sticky='top'>
			<Navbar.Brand href='#home'>FoodHub</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link href='#features'>Become a partner</Nav.Link>
					<Nav.Link href='#pricing'>Pricing</Nav.Link>
					<NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
						<NavDropdown.Item href='#action/3.1'>
							Action
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.2'>
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.3'>
							Something
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href='#action/3.4'>
							Separated link
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Nav>
					<NavLink className='nav-link' to='/signup'>
						Sign up
					</NavLink>
					<NavLink className='nav-link' to='/login'>
						Log in
					</NavLink>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavBar
