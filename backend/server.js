const express = require("express");

const app = express();

const dotenv = require("dotenv");
const notes = require("./data/notes");
// import notes from "./data/notes.js";
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMW");

dotenv.config();
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running");
});

//to get all notes in json format
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// to get a single note
app.get("/api/notes/:id", (req, res) => {
  //   res.json(notes[0]);
  // but we have to retrieve the note of specific id, so we will find it
  const note = notes.find((n) => {
    return n._id === req.params.id;
  });

  res.json(note);
});

// ///////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Listeing on port ${PORT}`));
