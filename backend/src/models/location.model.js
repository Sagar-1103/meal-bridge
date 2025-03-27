import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: [Number],
  });

export default locationSchema