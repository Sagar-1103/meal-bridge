import mongoose from 'mongoose';
import locationSchema from './location.model.js';

const charitySchema = new mongoose.Schema({
  charityID: {
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
  charitylocation:{
    type:locationSchema,
  },
  verificationStatus: {
    type: String,
    enum: ["Pending", "Verified", "Rejected"],
    default: "Pending",
  },
  foodRequirements: {
    category: {
      type: [String], // Example: ["veg", "non-veg", "perishable", "non-perishable"]
      required: true,
    },
    maxCapacityKg: {
      type: Number, // Maximum food storage capacity in kg
      required: true,
    },
  },
  operatingHours: {
    start:String,
    end:String,
  },
  pastDonations: [
    {
      listItemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ListItem",
      },
      receivedDate: Date,
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model("CharityProfile", charitySchema);
