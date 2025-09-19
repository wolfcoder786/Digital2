// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());



// allow frontend requests
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/chatRoutes", chatRoutes);
app.get("/", (req, res) => res.send("Auth Backend Running ✅"));


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection error:", err));
