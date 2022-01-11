import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

const Menu = () => {

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