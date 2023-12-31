// import React, { useEffect, useState } from "react";
// import Mainscreen from "../components/Mainscreen";
// import { Link } from "react-router-dom";
// import { Button, Card, Badge, Accordion } from "react-bootstrap";
// import axios from "axios";

// function MyNotes() {
//   const [notes, setNotes] = useState([]);

//   const deleteHandler = (id) => {
//     if (window.confirm("Are you sure ?")) {
//     }
//   };

//   const fetchNotes = async () => {
//     const { data } = await axios.get("/api/notes");
//     // console.log(data);
//     setNotes(data);
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   return (
//     <Mainscreen title="Welcome Nirmal Buoy">
//       <Link to="createnote">
//         <Button style={{ marginBottom: 13 }}>Create new Note</Button>
//       </Link>

//       {notes.map((note) => (
//         <Accordion key={note._id}>
//           <Card style={{ margin: 10 }}>
//             <Card.Header style={{ display: "flex" }}>
//               <span
//                 style={{
//                   color: "black",
//                   flex: 1,
//                   textDecoration: "None",
//                   cursor: "pointer",
//                   alignSelf: "center",
//                   fontSize: 18,
//                 }}
//               >
//                 <Accordion.Header as={Card.Text} eventKey={note._id}>
//                   {note.title}
//                 </Accordion.Header>
//               </span>

//               <div>
//                 <Button
//                   href={`/note/${note._id}`}
//                   className="btn btn-outline-success ms-2"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   className="btn btn-outline-danger  mx-2"
//                   variant="danger"
//                   onClick={() => deleteHandler(note._id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </Card.Header>

//             <Accordion.Body eventKey={note._id}>
//               <Card.Body>
//                 <h4>
//                   <Badge variant="warning" className="bg-success">
//                     Category - {note.category}
//                   </Badge>
//                 </h4>
//                 <blockquote className="blockquote mb-0">
//                   {/* <ReactMarkdown>{note.content}</ReactMarkdown> */}
//                   <p>{note.content}</p>

//                   <footer className="blockquote-footer">
//                     Created on - Date
//                   </footer>
//                 </blockquote>
//               </Card.Body>
//             </Accordion.Body>
//           </Card>
//         </Accordion>
//       ))}
//     </Mainscreen>
//   );
// }

// export default MyNotes;

// //////////////////////////////////////

import React, { useEffect, useState } from "react";
import Mainscreen from "../components/Mainscreen";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function MyNotes() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdateNote = async (id, title, content, category) => {
    try {
      setError(null);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, category },
        config
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? data : note))
      );
    } catch (error) {
      console.error("Error updating note: ", error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  };

  const handleCreateNote = async (title, content, category) => {
    try {
      setError(null);

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

      setNotes((prevNotes) => [...prevNotes, data]);
    } catch (error) {
      console.error("Error creating note: ", error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  };

  const deleteHandler = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (shouldDelete) {
      try {
        setError(null);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/notes/${id}`, config);
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } catch (error) {
        console.error("Error deleting note: ", error);
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setError(message);
      }
    }
  };

  // const userInfo = localStorage.getItem("userInfo");

  const fetchNotes = async () => {
    try {
      if (userInfo) {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get("/api/notes/", config);
        setNotes(data);
        // setError(null);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching notes: ", error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [userInfo]);

  return (
    <Mainscreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(notes)}
      <Link to="createnote">
        <Button style={{ marginBottom: 13 }}>Create new Note</Button>
      </Link>

      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}

      {notes.map((note) => (
        <Accordion key={note._id}>
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
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                  {/* <p>{note.content}</p> */}

                  <footer className="blockquote-footer">
                    Created on{" "}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </cite>
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
