import express from "express";
import multer from "multer";
import supabase from "../database/supabase.js";

const router = express.Router();


// store the uploaded image temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({ storage });


// Upload one clothing image
router.post("/", upload.single("image"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded."
            });
        }


        // Get information from the frontend
        const type = req.body.type;
        const minTemp = req.body.minTemp;
        const maxTemp = req.body.maxTemp;


        // create a unique filename for each uploads
        const filename =
            Date.now() + "-" + req.file.originalname;


        // Upload image to Supabase Storage
        const { error: uploadError } = await supabase
            .storage
            .from("clothing-images")
            .upload(filename, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false
            });


        if (uploadError) {
            console.error(
                "Supabase Storage upload error:",
                uploadError
            );

            return res.status(500).json({
                message: "Image upload failed.",
                error: uploadError.message
            });
        }


        // Get the public URL for the image
        const { data: publicUrlData } = supabase
            .storage
            .from("clothing-images")
            .getPublicUrl(filename);

        const imageUrl = publicUrlData.publicUrl;


        // Save clothing information in Supabase database
        const { data, error: databaseError } = await supabase
            .from("clothing")
            .insert([
                {
                    filename: filename,
                    type: type,
                    min_temp: minTemp,
                    max_temp: maxTemp
                }
            ])
            .select()
            .single();


        if (databaseError) {

            console.error(
                "Supabase database error:",
                databaseError
            );


            // Delete the selected clothing from the db
            await supabase
                .storage
                .from("clothing-images")
                .remove([filename]);


            return res.status(500).json({
                message: "Could not save clothing information.",
                error: databaseError.message
            });
        }


        res.json({
            message: "Clothing uploaded successfully!",
            clothing: data,
            imageUrl: imageUrl
        });

    } catch (error) {

        console.error("Upload error:", error);

        res.status(500).json({
            message: "Server error.",
            error: error.message
        });
    }
});


export default router;