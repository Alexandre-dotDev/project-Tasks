const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log("Não foi possível realizar a conesão!", error);
    throw new Error("Não foi possível realizar a conexão!");
  }
};

module.exports = connectToDatabase;
