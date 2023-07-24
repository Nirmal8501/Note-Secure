const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  removeNote,
} = require("../controller/noteController");

// /////////////

const { protect } = require("../middleware/authMw");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);

//anyone can get note but only the user who created can modify, we can also protect the get() by the way so that no one can see our note (If we want no one else to see).
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, removeNote);
// .put().delete();

module.exports = router;
