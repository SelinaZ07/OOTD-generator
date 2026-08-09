import express from "express";
import db from "../database/database.js";
import fs from "fs";
import path from "path";

const router = express.Router();

//get clothing and return the items stored in the wardrobe
router.get("/",(req,res)=>{
    // SQL query to retrieve every clothing item
    const sql = `SELECT *
    FROM clothing
    ORDER BY id DESC`;

    db.all(sql, [], (err, rows)=>{
        if (err){
            console.error(err);
            return res.status(500).json({
                message: "Database error."
            });
        }

        //send all clothing items back to the frontend
        res.json(rows);
    });
});

//allow users to delete clothing from the database
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    //first find the clothing item
    db.get(
        "SELECT * FROM clothing WHERE id=?",
        [id],
        (err, item) => {
            if (err){
                console.error("Database error:", err);
                return res.status(500).json({
                    message: "Database error",
                    error: err.message
                });
            }

            if (!item){
                return res.status(404).json({
                    message: "Clothing item not found"
                });
            }

            //delete image file
            const imagePath = path.join(
                "uploads",
                item.filename
            );

            fs.unlink(imagePath, (err)=>{
                //ignore if file doesn't exist
                if (err) {
                    console.log("Image delete error:",err);
                }

                //delete database row
                db.run(
                    "DELETE FROM clothing WHERE id= ?",
                    [id],
                    function(err){
                        if (err) {
                            console.error("Database delete error:", err);

                            return res.status(500).json({
                                message: "Database delete error",
                                error: err.message
                            });
                        }
                        res.json({
                            message: "Clothing deleted successfully"
                        });
                    }
                );
            });
        }
    );

});
export default router;
