/* 
    Title: RodriguezAlvarado-session-routes.js
    Date: 02/17/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Routes for signup and login
    Sources:
        https://github.com/buwebdev/web-420/tree/master
*/
// Import the express framework
const express = require('express');
// Assign the router variable
const router = express.Router();
// Import the User's model
const User = require('../models/RodriguezAlvarado-users');
// Import the bcrypt framework
const bcrypt = require('bcryptjs');
// Create variable saltRound equal to 10
const saltRounds = 10;
/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *      - signup
 *     name: signup
 *     summary: User SignUp
 *     requestBody:
 *       description: User fields
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Registered User
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signup', async (req, res) => {
    try {
        // Get the userName, password, and emailAddress from the req.body
        const { userName, password, emailAddress } = req.body;
        // Find the user
        const user = await User.findOne({ userName: userName} );
        // If the user doesn't exist
        if(!user) {
            const newRegisteredUser = {
                userName: userName,
                password: bcrypt.hashSync(password, saltRounds),
                emailAddress: emailAddress
            };
            await User.create(newRegisteredUser);
            return res.status(200).send('Registered User');
        // Else if the user already exists
        } else {
            return res.status(401).send('Username is already in use');
        }
    } catch (err) {
        if(err.name == 'MongoError') {
            return res.status(501).send('MongoDB Exception');
        }
        return res.status(500).send('Server Exception');
    }
});
/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *      - login
 *     name: login
 *     summary: User Login
 *     requestBody:
 *       description: User fields
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async(req, res) => {
    try {
        // Get the userName and password from the req.body
        const { userName, password } = req.body;
        // Find the user
        const user = await User.findOne({ userName: userName });
        // If the user exist
        if(user) {
            // Compare the password entered with the password saved in the database
            let passwordIsValid = bcrypt.compareSync(password, user.password);
            // If the password matches
            if(passwordIsValid) {
                return res.status(200).send('User logged in');
            // If the password doesn't match
            } else {
                return res.status(401).send('Invalid username and/or password');
            }
        // Else if the user doesn't exist
        } else {
            return res.status(401).send('Invalid username and/or password');
        }
    } catch (err) {
        if(err.name == 'MongoError') {
            return res.status(501).send('MongoDB Exception');
        }
        return res.status(500).send('Server Exception');
    }
});

// Export the router
module.exports = router;