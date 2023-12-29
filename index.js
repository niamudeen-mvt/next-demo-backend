require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/index.js");
const connectDb = require("./utils/db.js");
const colors = require("colors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("next demo backend is working");
});

const PORT = 7000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`.bgBlue);
  });
});

module.exports = app;
