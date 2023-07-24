import React, { useState, useEffect } from "react";
import MainScreen from "../../components/Mainscreen";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import axios from "axios";

function SingleNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchNoteData = async () => {
    // e.preventDefault();
    try {
      setError(null);
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/notes/${id}`, config);

      setLoading(false);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching note: ", error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  };

  useEffect(() => {
    fetchNoteData();
  });

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const handleUpdateNote = async () => {
    // e.preventDefault();
    try {
      setError(null);
      setLoading(true);

      const updatedNote = {
        title,
        content,
        category,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/notes/${id}`, updatedNote, config);

      setLoading(false);
      navigate("/mynotes");
    } catch (error) {
      setLoading(false);
      console.error("Error updating note: ", error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Body>
          <Form onSubmit={handleUpdateNote}>
            {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label className="my-3">Content</Form.Label>
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

            <Form.Group controlId="category">
              <Form.Label className="my-3">Category</Form.Label>
              <Form.Control
                type="text"
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
              onClick={handleUpdateNote}
              className="mx-2 btn btn-outline-success"
            >
              Update Note
            </Button>
            <Button
              type="button"
              className="mx-2 btn btn-outline-dark"
              onClick={resetHandler}
              variant="danger"
            >
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
