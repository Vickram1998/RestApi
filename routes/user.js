const express = require('express');
const mongoose = require('mongoose');
const User = require("../modules/user"); 
const { body, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
const router = express.Router();



router.post('/api/v1/users', body("email").isEmail(), body("name").isAlpha(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await User.create(req.body);
        res.json({
            status: "Success",
            user
        });
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        });
    }
});

module.exports= router