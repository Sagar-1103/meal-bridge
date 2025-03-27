import mongoose from 'mongoose';
import locationSchema from './location.model.js';

const volunteerSchema = new mongoose.Schema({
  volunteerID: {
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
  contact: {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  volunteerlocation:{
    type:locationSchema,
  },
  verifiedStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  identityVerification: {
    govtIDType: {
      type: String,
      enum: ["Aadhar", "Driver's License", "Passport", "Voter ID"],
    },
    govtIDNumber: {
      type: String,
      unique: true,
      sparse: true, // Allows empty but ensures uniqueness if filled
    },
    photoURL: String, // URL of uploaded ID photo
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  vehicle: {
    type: {
      type: String,
      enum: ["Car", "Bike", "Van", "Truck"],
      required: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    capacity: {
      type: Number, // Capacity in kg
      required: true,
      min: 10, // Minimum capacity of 10 kg
    },
  },
  experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Experienced"],
    default: "Beginner",
  },
  availability: {
    days: {
      type: [String],
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    timeSlots: [{
      start: String,
      end: String,   
    }],
  },
  assignedDonations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ListItem",
  }],
}, { timestamps: true });

export default mongoose.model("Volunteer", volunteerSchema);
