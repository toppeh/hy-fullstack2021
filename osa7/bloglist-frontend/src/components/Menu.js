import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Menu = () => {
  const user = useSelector(state => state.user)
  const padding = {
    paddingRight: 10
  }
  const style = {
    background: '#b0afac',
    paddingTop: 15,
    paddingLeft: 5,
    paddingBottom: 5
  }

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/">Blog app</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav >
          <Nav.Link href="/blogs">Blogs</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu