import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import MainScreen from "../../components/MainScreen";
import MainScreen from "../../components/Mainscreen";
import "./UserProfile.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!userInfo) {
          return;
        }
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${userInfo.token}`,
        //     // "Content-type": "application/json",
        //   },
        // };

        // const userData = {
        //   name: name,
        //   email: email,
        //   pic: pic,
        // };

        // const { data } = await axios.post(
        //   "/api/users/profile",
        //   userData,
        //   config
        // );

        setName(userInfo.name);
        setEmail(userInfo.email);
        setPic(userInfo.pic);
        // const {} = await axios.get("/api/users/profile", config);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user info: ", error);
        setError("Failed to fetch user info");
      }
    };

    fetchUserInfo();
  }, [userInfo.token]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
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
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userData = {
        name,
        email,
        pic,
        // Assuming you want to update the password too
      };

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Make the API call to update the user profile on the server
      const { data } = await axios.post("/api/users/profile", userData, config);

      // Update the userInfo state with the latest data from the API call
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...userInfo,
          name: data.name,
          email: data.email,
          pic: data.pic,
        })
      );

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      setError("Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={updateProfileHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="my-1"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-1"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="my-1"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="my-1"
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="file"
                  label="Upload Profile Picture"
                  className="my-1"
                  custom
                  accept="image/*"
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                className="my-3 btn btn-outline-dark"
              >
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default UserProfile;
