import React from "react";
import Mainscreen from "../components/Mainscreen";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Notes from "./MyNotes";

const MyNotes = () => {
  return (
    <Mainscreen title="Welcome Nirmal Buoy">
      <Link to="createnote">
        <Button style={{ marginBottom: 13 }}>Create new Note</Button>

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
              Title
            </span>

            <div>
              <Button className="btn btn-primary btn-sm">Edit</Button>
              <Button className="btn btn-danger btn-sm" variant="danger">
                Delete
              </Button>
            </div>
          </Card.Header>
        </Card>
      </Link>
    </Mainscreen>
  );
};

export default MyNotes;
