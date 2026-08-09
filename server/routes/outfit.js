import express from "express";
import db from "../database/database.js";
import axios from "axios";

const router = express.Router();

//get outfit (return one top and one bottom)
router.get("/", async (req,res) =>{

    try {
        //get live weather from the weather API
        const weatherResponse = await axios.get(
            `http://localhost:3000/weather`
        );

        const currentTemp = weatherResponse.data.temperature;
        console.log("Current temperature:", currentTemp);

        //find clothing items in temperature range
        const sql = `SELECT *
        FROM clothing
        WHERE minTemp <= ?
        AND maxTemp >= ?`;

        db.all(sql, [currentTemp, currentTemp], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Database error."
                });
            }

            //separate into tops and bottoms
            const tops =rows.filter(item => item.type ==="top");
            const bottoms = rows.filter(item => item.type === "bottom");

            //make sure there's at least one top and a bottom
            if (tops.length===0 || bottoms.length ===0) {
                return res.status(404).json({
                    message: "Not enough clothing for today's weather."
                });
            }

            //randomly choose a top and a bottom
            const top=tops[Math.floor(Math.random() * tops.length)];
            const bottom = bottoms[Math.floor(Math.random()*bottoms.length)];

            //return the outfit
            res.json({
                temperature: currentTemp,
                top, bottom
            });
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Couldn't get weather data."
        });
    }
});


export default router;