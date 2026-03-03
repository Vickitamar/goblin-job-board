const mongoose = require("mongoose");
const dbURI = process.env.MONGODB_URI;
const connectDB = async () => {
  console.log("is this right?", dbURI);
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

module.exports = connectDB;
