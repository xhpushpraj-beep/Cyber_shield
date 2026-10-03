 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
    res.json({
        message: "🛡️ Cyber Shield Backend is running!"
    });
});

app.use("/api/auth", authRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB connected");

        app.listen(process.env.PORT || 5000, () => {
            console.log(
                `🚀 Server running on http://localhost:${process.env.PORT || 5000}`
            );
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:");
        console.error(error.message);
    });