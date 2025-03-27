import {AsyncHandler} from "../utils/AsyncHandler.js";
import bussinessProfileModel from "../models/bussinessProfile.model.js";
import charityProfileModel from "../models/charityProfile.model.js";
import bcrypt from 'bcryptjs'
import volunteerProfileModel from "../models/volunteerProfile.model.js";
import jwt from 'jsonwebtoken'
import listitemModel from "../models/listitem.model.js";

export const createlist = AsyncHandler(async(req,res)=>{
    const { businessID, foodDetails, charityID, volunteerID, edible } = req.body;

    // Validate required fields
    if (!businessID || !foodDetails || !foodDetails.name || !foodDetails.category || !foodDetails.weight) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    // Create new ListItem
    const listItem = new listitemModel({
      businessID,
      foodDetails,
      charityID,
      volunteerID,
      edible,
    });
  
    // Save to DB
    const savedListItem = await listItem.save();
  
    res.status(201).json({
      message: "ListItem created successfully",
      data: savedListItem,
    });
})

export const charitylist = AsyncHandler(async(req,res)=>{
})


