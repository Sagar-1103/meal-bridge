 import mongoose from "mongoose";
 
const listItemSchema = new mongoose.Schema({
    listID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    businessID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BussinessProfile",
      required: true,
    },
    foodDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: String,
      category: {
        type: [String],
        enum: ["veg", "non-veg"],
        required: true,
      },
      weight: {
        type: Number,
        required: true,
        min: 0.1,
      },
      preparedTime: {
        type: Number, // Time in minutes
        required: true,
        min: 0,
      },
      status: {
        type: String,
        enum: ["pending", "in_progress", "delivered", "pickup"],
        default: "pending",
      },
    },
    charityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CharityProfile",
    },
    volunteerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
    edible: {
      description: String,
      imageURL: String,
      quality: {
        type: String,
        enum: ["Excellent", "Good", "Fair", "Poor"],
      },
      freshness: {
        type: String,
        enum: ["Fresh", "Stale", "Expired"],
      },
      overallScore: {
        type: Number,
        min: 1,
        max: 10,
      },
    },
  }, { timestamps: true });
  
export default mongoose.model("ListItem", listItemSchema);
  