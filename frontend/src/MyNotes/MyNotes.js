import React from "react";
import Mainscreen from "../components/Mainscreen";
import { Link } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import notes from "../data/notes";

function MyNotes() {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
    }
  };

  return (
    <Mainscreen title="Welcome Nirmal Buoy">
      <Link to="createnote">
        <Button style={{ marginBottom: 13 }}>Create new Note</Button>
      </Link>

      {notes.map((note) => (
        <Accordion>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  flex: 1,
                  textDecoration: "None",
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Header as={Card.Text} eventKey={note._id}>
                  {note.title}
                </Accordion.Header>
              </span>

              <div>
                <Button
                  href={`/note/${note._id}`}
                  className="btn btn-outline-success ms-2"
                >
                  Edit
                </Button>
                <Button
                  className="btn btn-outline-danger  mx-2"
                  variant="danger"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>

            <Accordion.Body eventKey={note._id}>
              <Card.Body>
                <h4>
                  <Badge variant="warning" className="bg-success">
                    Category - {note.category}
                  </Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  {/* <ReactMarkdown>{note.content}</ReactMarkdown> */}
                  <p>{note.content}</p>

                  <footer className="blockquote-footer">
                    Created on - Date
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </Mainscreen>
  );
}

export default MyNotes;
