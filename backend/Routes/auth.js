import express from 'express';
import User from '../Models/User.js';
import Note from '../Models/Note.js';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchuser from '../Middleware/fetchuser.js';
import dotenv from 'dotenv';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import multer from 'multer';
import streamifier from 'streamifier';
dotenv.config();
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
// ROUTE 1 :- create user

router.post(
    '/createuser',
    [
        body('name', 'Please enter a valid name').isLength({ min: 3 }),
        body('email', 'Please enter a valid email').isEmail(),
        body('password', 'Password must contain 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            //check errors
            let success = false;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }

            // check the user email already exist
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, errors: 'This email has already an account' });
            }
            //secure password
            const salt = await bcrypt.genSalt(10)
            const securedPass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPass,
                profilepic: ""
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.SECRET)
            success = true;
            res.json({ success, authToken });
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal Server Error")
        }
    })

// ROUTE 2 :- login check
router.post(
    '/login',
    [
        body('email', 'Please enter a valid email').isEmail(),
        body('password', 'Password can not be blank').exists(),
    ],
    async (req, res) => {
        try {
            //check errors
            let success = false;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ success, errors: "Enter a valid email" });
            }
            const { email, password } = req.body;
            //authenticate user
            let user = await User.findOne({ email })
            if (!user) {
                return res.json({ success, errors: "User doest not exist!!" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.json({ success, errors: 'Email & Password do not match' });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.SECRET)
            const { name } = user;
            success = true;
            res.json({ success, authToken, name });
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal Server Error")
        }
    })

//Route 3:- Get user 
router.get(
    '/getuser',
    fetchuser,
    async (req, res) => {
        try {
            let success = false;
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            success = true
            res.send({ success, user })
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal Server Error")
        }
    })

//Route 4:- delete user account
router.delete(
    '/deleteaccount',
    fetchuser,
    async (req, res) => {
        try {
            let success = false;
            const userId = req.user.id;
            await Note.deleteMany({ user: req.user.id });
            const user = await User.findByIdAndDelete(userId)
            success = true;
            res.json({ success, user });
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal Server Error")
        }
    })

const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'profilepics' },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};
//Route 4:- add profile picture
router.post('/updateprofile', fetchuser, upload.single('profilepic'), async (req, res) => {
    try {
        const { name, email, date } = req.body;
        let profilePicUrl = "";
        success = false;
        if (req.file) {
            const result = await streamUpload(req.file.buffer);
            console.log(result.secure_url)
            profilePicUrl = result.secure_url;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                email,
                date,
                profilePic: profilePicUrl,
            },
            { new: true }
        );

        res.json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating profile' });
    }
});

export default router; // Uncomment this line if using ES6 modules