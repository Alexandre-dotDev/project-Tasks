const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database.js");
const TaskModel = require("./src/model/task.model");

dotenv.config();

const app = express();
app.use(express.json());

connectToDatabase();

app.get("/tasks", async (req, res) => {
  const tasks = await TaskModel.find({});

  res.status(200).send(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).send("Task não localizada.");
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);

    await newTask.save();

    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.nessage);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;

    const taskToUpdate = await TaskModel.findById(taskId);
    const allowerUpdate = ["isCompleted"];
    const requestedsUpdates = Object.keys(req.body);

    for (update of requestedsUpdates) {
      if (allowerUpdate.includes(update)) {
        taskToUpdate[update] = taskData[update];
      } else {
        return res.status(500).send(`O campo ${update} não é editavel.`);
      }
    }

    await taskToUpdate.save();
    res.status(200).send(taskToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const taskToDelete = await TaskModel.findById(taskId);

    if (!taskToDelete) return res.status(404).send("Id não localizado.");

    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
