import React from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
      {/* // <Navbar bg="primary" expand="lg" variant="dark"> */}
      <Container>
        <Navbar.Brand className="mr-auto">
          <Link to="/">Note Secure</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Nav>

          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            {/* <Nav.Link href="#action2">Link</Nav.Link> */}
            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  navigate("/");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// export default NavScrollExample;

export default Header;
