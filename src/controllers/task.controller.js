const TaskModel = require("../model/task.model");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getTasks() {
    try {
      const tasks = await TaskModel.find({});

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
        return this.res.status(404).send("Task não localizada.");
      }
      this.res.status(200).send(task);
    } catch (error) {
      this.res.status(404).send(error.message);
    }
  }

  async postTask() {
    try {
      const newTask = new TaskModel(this.req.body);

      await newTask.save();

      this.res.status(201).send(newTask);
    } catch (error) {
      this.res.status(500).send(error.nessage);
    }
  }

  async patchTask() {
    try {
      const taskId = this.req.params.id;
      const taskData = this.req.body;

      const taskToUpdate = await TaskModel.findById(taskId);
      const allowerUpdate = ["isCompleted"];
      const requestedsUpdates = Object.keys(this.req.body);

      for (update of requestedsUpdates) {
        if (allowerUpdate.includes(update)) {
          taskToUpdate[update] = taskData[update];
        } else {
          return this.res.status(500).send(`O campo ${update} não é editavel.`);
        }
      }

      await taskToUpdate.save();
      this.res.status(200).send(taskToUpdate);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async deleteTask() {
    try {
      const taskId = this.req.params.id;

      const taskToDelete = await TaskModel.findById(taskId);

      if (!taskToDelete) return this.res.status(404).send("Id não localizado.");

      const deletedTask = await TaskModel.findByIdAndDelete(taskId);

      this.res.status(200).send(deletedTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskController;