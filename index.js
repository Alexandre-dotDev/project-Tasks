const express = require("express");
const dotenv = require("dotenv");
const TaskRoutes = require("./src/routes/task.routes");

const connectToDatabase = require("./src/database/mongoose.database.js");

dotenv.config();

const app = express();

connectToDatabase();

app.use("/tasks", TaskRoutes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
