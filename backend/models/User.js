const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        photo: {
            type: String,
            default: ""
        },

        securityScore: {
            type: Number,
            default: 0
        },

        quizScore: {
            type: Number,
            default: 0
        },

        phishingCompleted: {
            type: Boolean,
            default: false
        },

        tipsCompleted: {
            type: Boolean,
            default: false
        },

        strongPasswordCompleted: {
            type: Boolean,
            default: false
        },

        safeUrlCompleted: {
            type: Boolean,
            default: false
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);