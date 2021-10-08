const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
require("./db/conn");

//Middleware
app.use(express.json());

// const User = require("./model/userSchema");

// router file link
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening PORT ${PORT}...`);
});
