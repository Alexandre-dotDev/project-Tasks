const express = require("express");
const TaskModel = require("../model/task.model");

const TaskController = require("../controllers/task.controller");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
  return new TaskController(req, res).getTaskId();
});

router.post("/", async (req, res) => {
  return new TaskController(req, res).postTask();
});

router.patch("/:id", async (req, res) => {
  return new TaskController(req, res).patchTask();
});

router.delete("/:id", async (req, res) => {
  return new TaskController(req, res).deleteTask();
});

module.exports = router;
