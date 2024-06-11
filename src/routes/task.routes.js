const express = require("express");
const TaskModel = require("../model/task.model");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const tasks = await TaskModel.find({});

  res.status(200).send(tasks);
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);

    await newTask.save();

    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.nessage);
  }
});

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
