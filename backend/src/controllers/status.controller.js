import listitemModel from "../models/listitem.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

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
    const { listID, checklist } = req.body;

    if (!listID) {
        return res.status(400).json({ message: "listID is required" });
    }

    if (!checklist || typeof checklist !== "object" || !checklist.checked) {
        return res.status(400).json({ message: "Invalid checklist format" });
    }

    try {
        // Update food status and set the checklist
        const updatedItem = await listitemModel.findOneAndUpdate(
            { listID: listID }, 
            { 
                $set: { 
                    "foodDetails.status": "picked_up",
                    "foodDetails.checklist": checklist 
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


