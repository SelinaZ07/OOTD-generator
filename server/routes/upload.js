import express from "express";
import multer from "multer"; //handle image uploads
import db from "../database/database.js";

const router =express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({storage});

//upload one clothing image
router.post("/", upload.single("image"),(req,res)=>{

    //get the information from the frontend
    const filename = req.file.filename;
    const type = req.body.type;
    const minTemp = req.body.minTemp;
    const maxTemp = req.body.maxTemp;

    const sql = `
    INSERT INTO clothing
    (filename, type, minTemp, maxTemp)
    VALUES (?,?,?,?)`;

    //save the clothing item into SQLite
    db.run(
        sql,
        [filename, type, minTemp, maxTemp],
        function(err){
            if (err){
                console.error(err);
                return res.status(500).json({
                    message: "Database error."
                });
            }

            res.json({
                message: "clothing uploaded successfully!",
                id: this.lastId,
                filename, type, minTemp, maxTemp
            });
        }
    );

});

export default router;
