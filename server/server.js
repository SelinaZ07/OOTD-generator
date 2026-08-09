
import express from "express";
import cors from "cors"; //allow the frontend to communicate with the backend
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather.js";//import weather routes
import uploadRoutes from "./routes/upload.js";
import "./database/database.js";
import clothingRoutes from "./routes/clothing.js";
import outfitRoutes from "./routes/outfit.js";

dotenv.config();

const app = express(); //create express application
const PORT = 3000;

app.use(cors());//allow requests from the frontend
app.use(express.json());
app.use("/uploads", express.static("uploads"));//allow browser to access files
app.use("/weather", weatherRoutes);
app.use("/upload",uploadRoutes);
app.use("/clothing", clothingRoutes);
app.use("/outfit", outfitRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running successfully!"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

