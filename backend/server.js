const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const connectDB = require("./config/db");

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
