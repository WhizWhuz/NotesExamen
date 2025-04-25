const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const connectDB = require("./config/db");
const app = require("./app");

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📻 Server listening to ${PORT}`);
});
