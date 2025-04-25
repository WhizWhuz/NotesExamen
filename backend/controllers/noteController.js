const Note = require("../models/Note");

// POST - Create a note
exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    res.status(201).json({ message: "Note created!", note });
  } catch (err) {
    res.status(500).json({ message: "Server error!", error: err.message });
  }
};

// GET - Show all notes from a logged in user
exports.getNotes = async ({ req, res }) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ notes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch notes!", error: err.message });
  }
};

// PUT - Update note
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, content },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found!" });

    res.status(200).json({ message: "Note updated!", note });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update note.", error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!note) return res.status(404).json({ message: "Not not found!" });

    res.status(200).json({ message: "Note deleted! 🚮" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: err.message });
  }
};
