 const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


/* ==================================================
   REGISTER
================================================== */

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            photo
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Please fill all required fields."
            });

        }


        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });


        if (existingUser) {

            return res.status(400).json({
                message: "An account with this email already exists."
            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = await User.create({

            name: name,

            email: email.toLowerCase(),

            password: hashedPassword,

            photo: photo || ""

        });


        res.status(201).json({

            message: "Account created successfully.",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                photo: user.photo

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error."
        });

    }

});


/* ==================================================
   LOGIN
================================================== */

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required."
            });

        }


        const user = await User.findOne({

            email: email.toLowerCase()

        });


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        const token = jwt.sign(

            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.json({

            message:
                "Login successful.",

            token: token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                photo: user.photo,

                securityScore:
                    user.securityScore,

                quizScore:
                    user.quizScore

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Server error."

        });

    }

});


/* ==================================================
   SAVE SECURITY PROGRESS
================================================== */

router.put("/progress", async (req, res) => {

    try {

        /* GET TOKEN */

        const authHeader =
            req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({

                message:
                    "No authorization token."

            });

        }


        /* REMOVE "Bearer " */

        const token =
            authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({

                message:
                    "Invalid authorization token."

            });

        }


        /* VERIFY TOKEN */

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        /* FIND USER */

        const user =
            await User.findById(
                decoded.userId
            );


        if (!user) {

            return res.status(404).json({

                message:
                    "User not found."

            });

        }


        /* GET PROGRESS DATA */

        const {

            securityScore,

            quizScore,

            phishingCompleted,

            tipsCompleted,

            strongPasswordCompleted,

            safeUrlCompleted

        } = req.body;


        /* UPDATE USER */

        user.securityScore =
            Number(securityScore || 0);

        user.quizScore =
            Number(quizScore || 0);

        user.phishingCompleted =
            Boolean(phishingCompleted);

        user.tipsCompleted =
            Boolean(tipsCompleted);

        user.strongPasswordCompleted =
            Boolean(strongPasswordCompleted);

        user.safeUrlCompleted =
            Boolean(safeUrlCompleted);


        /* SAVE */

        await user.save();


        res.json({

            message:
                "Security progress saved successfully.",

            securityScore:
                user.securityScore

        });

    }

    catch (error) {

        console.error(error);

        res.status(401).json({

            message:
                "Invalid or expired token."

        });

    }

});


module.exports = router;