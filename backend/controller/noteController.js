// const Note = require("../models/noteModel");
const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  //we will fetch notes using users id
  const notess = await Note.find({ user: req.user._id });
  res.json(notess);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("All Fields needs to be filled");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);
  //we are getting note id from params, "/:id".

  // check if not.user (the one who created note) is equal to current user (req.user) then only we should update note.

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cant perform this action");
  }

  if (note) {
    note.title = title;
    note.category = category;
    note.content = content;

    const updatedNote = note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const removeNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cant perform this action");
  }

  if (note) {
    // res.status()
    await note.deleteOne();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, removeNote };
