import listitemModel from "../models/listitem.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const updateFoodStatus_to_in_progress = AsyncHandler(async (req, res) => {
    const { listID } = req.params;
    console.log(listID)

    if (!listID) {
        return res.status(400).json({ message: "listID is required" });
    }

    // Update the food status to "in_progress"
    const updatedItem = await listitemModel.findOneAndUpdate(
        { listID: listID },
        { $set: { "foodDetails.status": "in_progress" } },
        { new: true } // Returns the updated document
    );

    if (!updatedItem) {
        return res.status(404).json({ message: "List item not found" });
    }

    res.status(200).json({ success: true, data: updatedItem });
});

export const updateFoodStatus_to_picked_up = AsyncHandler(async (req, res) => {
    const { listID } = req.params;
    console.log(listID)

    if (!listID) {
        return res.status(400).json({ message: "listID is required" });
    }

    // Update the food status to "in_progress"
    const updatedItem = await listitemModel.findOneAndUpdate(
        { listID: listID },
        { $set: { "foodDetails.status": "in_progress" } },
        { new: true } // Returns the updated document
    );

    if (!updatedItem) {
        return res.status(404).json({ message: "List item not found" });
    }

    res.status(200).json({ success: true, data: updatedItem });
});

