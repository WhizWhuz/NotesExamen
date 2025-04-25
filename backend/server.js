const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get("", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📻 Server listening to ${PORT}`);
});
