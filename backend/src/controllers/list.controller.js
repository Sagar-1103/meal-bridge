import {AsyncHandler} from "../utils/AsyncHandler.js";
import bussinessProfileModel from "../models/bussinessProfile.model.js";
import charityProfileModel from "../models/charityProfile.model.js";
import bcrypt from 'bcryptjs'
import volunteerProfileModel from "../models/volunteerProfile.model.js";
import jwt from 'jsonwebtoken'
import listitemModel from "../models/listitem.model.js";
import { v2 as cloudinary } from "cloudinary";

// const getairesponse=async(img_url)=>{
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_URL);

//     const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });
    
//     const imageResp = await fetch(
//        img_url
//     )
//         .then((response) => response.arrayBuffer());
    
//     const result = await model.generateContent([
//         {
//             inlineData: {
//                 data: Buffer.from(imageResp).toString("base64"),
//                 mimeType: "image/jpeg",
//             },
//         },
//         "Analyze the given food image and assess its quality based on visual characteristics such as freshness, texture, color, and overall appearance. Identify any visible signs of spoilage, inconsistency, or degradation. Additionally, provide a quality score out of 10 based on the following parameters: freshness (0-10), texture (0-10), color (0-10). Summarize the evaluation in a short, meaningful response.",
//     ]);
//     const response=result.response.text()
//     res.json({ai_img_reponse:response})
// }

const uploadToCloudinary = async (base64) => {
    const response = await cloudinary.uploader.upload(`data:image/png;base64,${base64}`, {
        folder: "speed_dials",
    });
    return response.secure_url;
};

export const createlist = AsyncHandler(async(req,res)=>{
    const { businessID, foodDetails, charityID, volunteerID, image_base_64 } = req.body;

    // Validate required fields
    if (!businessID || !foodDetails || !foodDetails.name || !foodDetails.category || !foodDetails.weight) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const base64Image1 = image_base_64.toString('base64');

    const imageURL = await uploadToCloudinary(base64Image1);

    // Create new ListItem
    const listItem = new listitemModel({
      businessID,
      foodDetails,
      charityID,
      volunteerID,
      edible:{
        imageURL:imageURL,
      },
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
                maxDistance: 5000,
            },
        },
        { $sort: { distance: -1 } } // Sorting in decreasing order
    ]);
    // console.log(nearbyBusinesses)
    const businessIDs = nearbyBusinesses.map((b) => b.businessID);
    // console.log(businessIDs)

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


export const volunteerlist = AsyncHandler(async (req, res) => {

    // Get business details with only pending status items
    const list = await listitemModel.find({ "foodDetails.status": "in_progress" });

    if (!list || list.length === 0) {
        return res.status(404).json({ message: "No in_progress items found for this business" });
    }

    res.status(200).json({ success: true, data: list });
});






