// Import packages
const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
// App
const app = express();
// Morgan
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));
// First route

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});
// Starting server
app.listen("2020");
