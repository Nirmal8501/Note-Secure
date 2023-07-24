import Mainscreen from "../../components/Mainscreen";
import "./RegisterScreen.css";
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
// import { set } from "mongoose";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postDetails = (pics) => {
    if (
      // pics ===
      // "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      !pics
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "NoteSecure");
      data.append("cloud_name", "njbuoy");
      fetch("https://api.cloudinary.com/v1_1/njbuoy/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "/api/users",
          {
            name,
            pic,
            email,
            password,
          },
          config
        );
        setLoading(false);

        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/mynotes");
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }

    // console.log(email);
  };

  return (
    <Mainscreen title="REGISTER">
      <div className="regContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="my-1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="my-1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group> */}
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic" className="my-1">
            <Form.Label>Profile Picture</Form.Label>
            {/* <Form.Control type="file" multiple /> */}
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              custom
              accept="image/*"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="my-4 btn btn-outline-dark"
          >
            Register
          </Button>

          <Row className="py-3">
            <Col>
              Have an Account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </Mainscreen>
  );
};

export default RegisterScreen;
