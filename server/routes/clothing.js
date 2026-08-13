import express from "express";
import supabase from "../database/supabase.js";

const router = express.Router();

// Get all clothing items from Supabase
router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("clothing")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Supabase error:", error);

            return res.status(500).json({
                message: "Database error",
                error: error.message
            });
        }

        // Add Supabase Storage URL to every clothing item
        const clothingWithUrls = data.map((item) => {
            const { data: publicUrlData } = supabase
                .storage
                .from("clothing-images")
                .getPublicUrl(item.filename);

            return {
                ...item,
                imageUrl: publicUrlData.publicUrl
            };
        });

        res.json(clothingWithUrls);

    } catch (error) {
        console.error("Server error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// Delete a clothing item
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Find the clothing item
        const { data: item, error: findError } = await supabase
            .from("clothing")
            .select("*")
            .eq("id", id)
            .single();

        if (findError || !item) {
            return res.status(404).json({
                message: "Clothing item not found"
            });
        }

        // Delete image from Supabase Storage
        const { error: storageError } = await supabase
            .storage
            .from("clothing-images")
            .remove([item.filename]);

        if (storageError) {
            console.error("Storage delete error:", storageError);

            return res.status(500).json({
                message: "Could not delete clothing image.",
                error: storageError.message
            });
        }

        // Delete database row
        const { error: databaseError } = await supabase
            .from("clothing")
            .delete()
            .eq("id", id);

        if (databaseError) {
            console.error("Database delete error:", databaseError);

            return res.status(500).json({
                message: "Could not delete clothing item.",
                error: databaseError.message
            });
        }

        res.json({
            message: "Clothing deleted successfully"
        });

    } catch (error) {
        console.error("Server error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

export default router;