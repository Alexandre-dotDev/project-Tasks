const TaskModel = require("../model/task.model");
const { notFoundErros, objectIdCastError } = require("../errors/mongo.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.erros");
const { default: mongoose } = require("mongoose");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAllTasks() {
    try {
      const tasks = await TaskModel.find({});

      if (!tasks) {
        return notFoundErros(this.res);
      }

      this.res.status(200).send(tasks);
    } catch (error) {
      this.res.status(404).send(error.message);
    }
  }

  async getTaskId() {
    try {
      const taskId = this.req.params.id;
      const task = await TaskModel.findById(taskId);
      if (!task) {
        return notFoundErros(this.res);
      }

      this.res.status(200).send(task);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(this.res);
      }

      this.res.status(404).send(error.message);
    }
  }

  async createTask() {
    try {
      const newTask = new TaskModel(this.req.body);

      await newTask.save();

      this.res.status(201).send(newTask);
    } catch (error) {
      this.res.status(500).send(error.nessage);
    }
  }

  async updateTask() {
    try {
      const taskId = this.req.params.id;
      const taskData = this.req.body;

      const taskToUpdate = await TaskModel.findById(taskId);
      const allowerUpdate = ["isCompleted"];
      const requestedsUpdates = Object.keys(taskData);

      for (const update of requestedsUpdates) {
        if (allowerUpdate.includes(update)) {
          taskToUpdate[update] = taskData[update];
        } else {
          return notAllowedFieldsToUpdateError(this.res);
        }
      }

      await taskToUpdate.save();

      this.res.status(200).send(taskToUpdate);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(this.res);
      }
      this.res.status(500).send(error.message);
    }
  }

  async deleteTask() {
    try {
      const taskId = this.req.params.id;

      const taskToDelete = await TaskModel.findById(taskId);

      if (!taskToDelete) {
        return notFoundErros(this.res);
      }

      const deletedTask = await TaskModel.findByIdAndDelete(taskId);

      this.res.status(200).send(deletedTask);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(this.res);
      }
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;
