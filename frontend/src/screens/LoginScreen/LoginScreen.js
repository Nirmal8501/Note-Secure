import MainScreen from "../../components/Mainscreen";
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
// import { login } from "../../actions/userActions";
import "./LoginScreen.css";

import axios from "axios";

const LoginScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/mynotes");
      // setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="my-4 btn btn-outline-dark"
          >
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
