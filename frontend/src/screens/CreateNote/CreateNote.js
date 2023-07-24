import React, { useState } from "react";
import MainScreen from "../../components/Mainscreen";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import axios from "axios";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const handleCreateNote = async (title, content, category) => {
    try {
      setError(null);
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/notes/create`,
        { title, content, category },
        config
      );

      setLoading(false);
      //   setNotes((prevNotes) => [...prevNotes, data]); // hererererererere
      navigate("/mynotes"); // Redirect to mynotes page after creating the note
    } catch (error) {
      setLoading(false);
      console.error("Error creating note: ", error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;

    handleCreateNote(title, content, category);
  };

  return (
    <MainScreen title="Create a Note">
      <Card>
        {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
        {/* <Card.Header>Create a new Note</Card.Header> */}
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label className="text-dark">Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                className="text-dark"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label className="my-3 text-dark">Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label className="my-3 text-dark">Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                className="mb-3"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button
              type="submit"
              variant="primary"
              className="mx-2 btn btn-outline-success"
            >
              Create Note
            </Button>
            <Button
              className="mx-2 btn btn-outline-dark"
              onClick={resetHandler}
              variant="danger"
            >
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
