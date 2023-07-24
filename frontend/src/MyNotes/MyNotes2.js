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

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      // Implement the delete functionality here
    }
  };

  // const userInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
  }, [notes]);

  return (
    <Mainscreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
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
