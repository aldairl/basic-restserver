const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
    });

    console.log("[DB] Database conected succesfully");
  } catch (error) {
    console.log(error);
    throw new Error("Error conecting database");
  }
};

module.exports = {
  dbConnection,
};
