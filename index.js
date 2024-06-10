const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database.js");
const TaskModel = require("./src/model/task.model.js");

dotenv.config();

const app = express();
app.use(express.json());

connectToDatabase();

app.get("/tasks", async (req, res) => {
  const tasks = await TaskModel.find({});

  res.status(200).send(tasks);
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);

    await newTask.save();

    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
