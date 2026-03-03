const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const connectDB = require("./databaseConnection");
connectDB();

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// npm run dev
