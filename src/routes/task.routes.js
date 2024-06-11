const express = require("express");

const TaskController = require("../controllers/task.controller");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  return new TaskController(req, res).getAllTasks();
});

router.get("/:id", async (req, res) => {
  return new TaskController(req, res).getTaskId();
});

router.post("/", async (req, res) => {
  return new TaskController(req, res).createTask();
});

router.patch("/:id", async (req, res) => {
  return new TaskController(req, res).updateTask();
});

router.delete("/:id", async (req, res) => {
  return new TaskController(req, res).deleteTask();
});

module.exports = router;
