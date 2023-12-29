require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/index.js");
const connectDb = require("./utils/db.js");
const colors = require("colors");
const cookieParser = require("cookie-parser");

const app = express();

const CLIENT_ORIGIN =
  process.env.NODE_ENV === "DEV"
    ? "http://localhost:3000"
    : "https://next-js-testing-azure.vercel.app";

app.use(cors({ credentials: true, origin: CLIENT_ORIGIN }));
app.use(express.json());
app.use(cookieParser());

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
