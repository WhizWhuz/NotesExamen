const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router
  .route("/")
  .post(noteController.createNote)
  .get(noteController.getAllNotes);

router
  .route("/:id")
  .get(noteController.getNoteById)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);

module.exports = router;
