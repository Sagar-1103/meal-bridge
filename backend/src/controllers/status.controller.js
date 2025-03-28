import { AsyncHandler } from "../utils/AsyncHandler.js";
import listitemModel from "../models/listitem.model.js";
import { v2 as cloudinary } from "cloudinary";

const uploadToCloudinary = async (base64) => {
    const response = await cloudinary.uploader.upload(`data:image/png;base64,${base64}`, {
        folder: "speed_dials",
    });
    return response.secure_url;
};

export const updateFoodStatus_to_in_progress = AsyncHandler(async (req, res) => {
    const { listID, charityID } = req.body; // Get both listID and charityID from request body

    console.log("listID:", listID);
    console.log("charityID:", charityID);

    if (!listID || !charityID) {
        return res.status(400).json({ message: "listID and charityID are required" });
    }

    try {
        // Update the food status to "in_progress" and set charityID
        const updatedItem = await listitemModel.findOneAndUpdate(
            { listID: listID },
            { 
                $set: { 
                    "foodDetails.status": "in_progress",
                    charityID: charityID 
                } 
            },
            { new: true } // Returns the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "List item not found" });
        }

        res.status(200).json({ success: true, data: updatedItem });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export const updateVolunteer_to_listing=AsyncHandler(async(req,res)=>{
    const {listID,volunteerID}=req.body;

    if (!listID) {
        return res.status(400).json({ message: "listID is required" });
    }

    const updatedItem = await listitemModel.findOneAndUpdate(
        { listID: listID },
        { $set: { volunteerID: volunteerID } },
        { new: true } // Returns the updated document
    );

    if (!updatedItem) {
        return res.status(404).json({ message: "List item not found" });
    }

    res.status(200).json({ success: true, data: updatedItem });

})


export const updateFoodStatus_to_picked_up = AsyncHandler(async (req, res) => {
    const { listID, checklist, image_base_64 } = req.body;

    if (!listID) {
        return res.status(400).json({ message: "listID is required" });
    }

    if (!checklist || typeof checklist !== "object") {
        return res.status(400).json({ message: "Invalid checklist format" });
    }

    if (!image_base_64) {
        return res.status(400).json({ message: "Image base64 is required" });
    }

    try {
        const base64Image1 = image_base_64.toString('base64');
        const imageURL = await uploadToCloudinary(base64Image1);

        if (!imageURL) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        // Add imageURL to checklist
        checklist.deliveryimage_URL = imageURL;

        // Update food status, checklist, and image URL
        const updatedItem = await listitemModel.findOneAndUpdate(
            { listID: listID }, // Ensure you're using `_id` for MongoDB
            { 
                $set: { 
                    "foodDetails.status": "pickup",
                    "checklist": checklist 
                } 
            },
            { new: true } // Returns the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "List item not found" });
        }

        res.status(200).json({ success: true, data: updatedItem });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

export const updateFoodStatus_to_delivered=AsyncHandler(async(req,res)=>{
    const {listID,charityID}=req.body;

    if (!listID) {
        return res.status(400).json({ message: "listID is required" });
    }

    if (!charityID) {
        return res.status(400).json({ message: "charityID is required" });
    }


    const updatedItem = await listitemModel.findOneAndUpdate(
        { charityID: charityID },
        { $set: { "foodDetails.status": 'delivered' } },
        { new: true } // Returns the updated document
    );

    if (!updatedItem) {
        return res.status(404).json({ message: "List item not found" });
    }

    res.status(200).json({ success: true, data: updatedItem });

})



