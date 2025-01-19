const express = require('express');
const router = express.Router();
const userData = require('../model/userData');
const jwt=require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        console.log("Login request body:", req.body);

        // Find the user by email
        const user = await userData.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found for email:", req.body.email);
            return res.status(404).send({ message: 'User not found' });
        }

        // Check if the entered password matches the stored password
        if (req.body.password === user.password) {
            const payload={email:user.email,password:user.password};
            const token=jwt.sign(payload,'blogApp'); //blogApp is a sercret key can be give anything
            console.log("Login successful for user:", user.email);
            return res.status(200).send({ message: 'Login Successful',token:token });
        } else {
            console.log("Invalid password for user:", user.email);
            return res.status(400).send({ message: 'Invalid Login' });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send({ message: 'Server Error' });
    }
});

module.exports = router;
