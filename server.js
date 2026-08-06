import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

import authRoutes from "./routes/auth.js";
import carRoutes from "./routes/cars.js";
import User from "./models/User.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));
app.use("/images", express.static(path.join(__dirname, "images")));

// MongoDB (don't stop the server if DB fails)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
  });

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// PUT route to update user profile in MongoDB (including email, gender, and state)
app.put('/api/auth/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    const { name, email, contact, gender, state } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name, email, contact, gender, state },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully in database',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        contact: updatedUser.contact,
        gender: updatedUser.gender,
        state: updatedUser.state
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});