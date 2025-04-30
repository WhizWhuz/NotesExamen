const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/")
  .post(authMiddleware, noteController.createNote)
  .get(authMiddleware, noteController.getAllNotes);

router
  .route("/:id")
  .get(authMiddleware, noteController.getNoteById)
  .put(authMiddleware, noteController.updateNote)
  .delete(authMiddleware, noteController.deleteNote);

module.exports = router;
