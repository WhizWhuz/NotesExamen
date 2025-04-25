const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// const authRotes = require("./routes/authRoutes")
// const noteRotes = require("./routes/noteRoutes")

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/notes", noteRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Global error.", err);
  res.status(500).json({ message: "Server error" });
});

module.exports = app;
