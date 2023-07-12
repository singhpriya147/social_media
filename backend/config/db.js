const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // console.log(`MongoDb connect :${conn.connection.host}`)
  } catch (error) {
    // console.log(error);


    //  If there is an error connecting to the database, the function logs the error and exits the process with a non-zero exit code.

// In a Node.js environment, when a process exits, it returns an exit code to the operating system to indicate whether the process completed successfully or encountered an error. A zero exit code means success, while a non-zero exit code indicates an error.

// In this code, if an error occurs when connecting to the MongoDB database, the function logs the error and exits the process with a non-zero exit code (process.exit(1)). This indicates to the operating system that there was an error during the execution of the process, and it can be useful for error reporting and handling purposes.

// For example, in a deployment environment, if the process exits with a non-zero exit code, it may trigger an automatic restart of the process, or an alert to a system administrator to investigate the cause of the error.


    process.exit(1);
  }
};
module.exports =connectDB;
