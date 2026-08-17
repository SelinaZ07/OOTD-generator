import express from "express";
import axios from "axios";
import supabase from "../database/supabase.js";

const router = express.Router();

//get outfit (return one top and one bottom)
router.get("/", async (req,res) =>{

    try {
        const city ="Seattle";
        //get live weather from the weather API
        const weatherResponse = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
        );

        const currentTemp = weatherResponse.data.current.temp_f;
        console.log("Current temperature:", currentTemp);

        //find clothing items in temperature range
        const {data: clothing, error} = await supabase
        .from("clothing").select("*").lte("min_temp",currentTemp)
        .gte("max_temp", currentTemp);

        if (error){
            console.error("Supabase error:", error);

            return res.status(500).json({
                message:"Database error.",
                error: error.message
            });
        }

        //separate into tops and bottoms
        const tops= clothing.filter(item => item.type ==="top");
        const bottoms= clothing.filter(item => item.type === "bottom");

        //make sure there's at least one top and a bottom
        if (tops.length===0 || bottoms.length ===0){
            return res.status(404).json({
                message: "Not enough clothing for today's weather."
            });
        }

        //randomly choose a top and a bottom
        const top=tops[Math.floor(Math.random() * tops.length)];
        const bottom = bottoms[Math.floor(Math.random()*bottoms.length)];

        //create image URL for the top
        const {data: topUrlData} = supabase.storage.from("clothing-images")
        .getPublicUrl(top.filename);

        //create image Url for the bottom
        const {data: bottomUrlData} = supabase.storage.from("clothing-images")
        .getPublicUrl(bottom.filename);

        //return the outfit
        res.json({
            temperature:currentTemp,
            top:{...top,
                imageUrl: topUrlData.publicUrl
            },
            bottom: {...bottom,
                imageUrl: bottomUrlData.publicUrl
            }
        });
    } catch(error){
        console.error("Outfit error:",error);
        res.status(500).json({
            message:"Couldn't get outfit data.",
            error: error.message
        });
    }
});


export default router;