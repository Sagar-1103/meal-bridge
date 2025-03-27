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

export const charitylist = AsyncHandler(async (req, res) => {
    const { charityID, category, minWeight, maxDistance } = req.query;

    if (!charityID) {
        return res.status(400).json({ message: "charityID is required" });
    }

    // Get charity's location
    const charity = await charityProfileModel.findById(charityID);
    if (!charity || !charity.charitylocation) {
        return res.status(404).json({ message: "Charity location not found" });
    }

    const { coordinates } = charity.charitylocation;
    const [longitude, latitude] = coordinates;

    // Find nearby businesses sorted in descending order of distance
    let nearbyBusinesses = await bussinessProfileModel.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [longitude, latitude] },
                distanceField: "distance",
                key: "businesslocation",
                spherical: true,
            },
        },
        { $sort: { distance: -1 } } // Sorting in decreasing order
    ]);
    console.log(nearbyBusinesses)
    const businessIDs = nearbyBusinesses.map((b) => b.businessID);
    console.log(businessIDs)

    // Applying filters
    const filters = { businessID: { $in: businessIDs } };

    // if (category) {
    //     filters["foodDetails.category"] = category;
    // }

    // if (minWeight) {
    //     filters["foodDetails.weight"] = { $gte: parseFloat(minWeight) };
    // }

    const listItems = await listitemModel.find(filters)
    console.log(listItems)

    res.status(200).json({ success: true, data: listItems });
});

export const businesslist = AsyncHandler(async (req, res) => {
    const { businessID } = req.query;

    if (!businessID) {
        return res.status(400).json({ message: "businessID is required" });
    }

    // Get business details
    const list = await listitemModel.find({businessID:businessID});
    if (!list) {
        return res.status(404).json({ message: "Business location not found" });
    }



    res.status(200).json({ success: true, data: list });
});




