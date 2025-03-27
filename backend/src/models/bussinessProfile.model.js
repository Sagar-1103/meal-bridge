import mongoose from "mongoose";
import locationSchema from "./location.model.js";

const BussinessProfileSchema = new mongoose.Schema({
  businessID: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password:{
    type:String,
    required:true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  businesslocation:locationSchema,
  contact: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    website: String,
  },
  openingHours: {
    start:String,
    end:String,
  },
  deliveryOptions: {
    type: [String],
    enum: ["Pickup", "Delivery"],
  },
  verifiedStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "verified",
  },
  registrationNumber: {
    type: String,
    unique: true,
    sparse: true, // Allows null values
  },
  foodSafetyCertifications: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

BussinessProfileSchema.index({ businesslocation: "2dsphere" });

export default mongoose.model("BussinessProfile",BussinessProfileSchema );

