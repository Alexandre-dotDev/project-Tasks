const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database.js");

dotenv.config();

const app = express();

connectToDatabase();

app.get("/tasks", (req, res) => {
  const tasks = [
    {
      descripiton: "Estadar Programação",
      isCompleted: false,
    },
  ];
  res.status(200).send(tasks);
});

const port = 3333;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
