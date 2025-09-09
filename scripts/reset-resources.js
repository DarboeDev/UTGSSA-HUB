const mongoose = require("mongoose");

// Connect to MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://baykartmobile:xtjgSE0ogv3kLMKI@cluster0.i3a8k.mongodb.net/ssa-website?retryWrites=true&w=majority";

async function resetResourcesCollection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Drop the resources collection
    try {
      await mongoose.connection.db.collection("resources").drop();
      console.log("Dropped resources collection");
    } catch (error) {
      if (error.message.includes("ns not found")) {
        console.log("Resources collection does not exist, nothing to drop");
      } else {
        throw error;
      }
    }

    console.log("Resources collection reset complete");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

resetResourcesCollection();
