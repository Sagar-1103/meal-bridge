import dotenv from "dotenv";
import connectDB from "./src/config/database.config.js";
import { app } from "./src/app.js";
import { connectCloudinary } from "./src/config/cloudinary.config.js";
import os from "os";
import fs from "fs";
import path from "path";

const uploadsDir = path.join(os.tmpdir(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config();

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });
    connectCloudinary();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error !!! ", err);
  });
