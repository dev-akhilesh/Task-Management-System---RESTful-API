const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Blacklist = require('../models/blacklist');
const authenticate = require('../middleware/authentication');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user (hashed)
 *       example:
 *         username: john_doe
 *         email: john.doe@example.com
 *         password: mypassword
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '409':
 *         description: User already exists, please log in
 *       '500':
 *         description: Error creating user
 */

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: "User already exists, please login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).send({ message: "User created successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Error creating user" });
    }
});


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: john.doe@example.com
 *               password: mypassword
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Error logging in
 */

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Error logging in' });
    }
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '500':
 *         description: Error logging out
 */

router.post('/logout', authenticate, async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const blacklistToken = new Blacklist({ token });
        await blacklistToken.save();

        res.send({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error logging out' });
    }
});

module.exports = router;






// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');
// const Blacklist = require('../models/blacklist');
// const authenticate = require('../middleware/authentication');

// const router = express.Router();

// router.post("/signup", async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).send({ error: "User already exists, please login" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save();

//         res.status(201).send({ message: "User created successfully", user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ error: "Error creating user" });
//     }
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).send({ message: 'Invalid credentials' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).send({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.send({ token });
//     } catch (error) {
//         res.status(500).send({ error: 'Error logging in' });
//     }
// });

// router.post('/logout', authenticate, async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];

//         const blacklistToken = new Blacklist({ token });
//         await blacklistToken.save();

//         res.send({ message: 'User logged out successfully' });
//     } catch (error) {
//         res.status(500).send({ error: 'Error logging out' });
//     }
// });

// module.exports = router;
