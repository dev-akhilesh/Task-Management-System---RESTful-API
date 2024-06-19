require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blacklist = require('../models/blacklist');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log('Incoming Token:', token);
        if (!token) return res.status(401).send({ message: 'Token required' });

        const isBlacklisted = await Blacklist.findOne({ token });
        console.log('Is Token Blacklisted:', isBlacklisted);
        if (isBlacklisted) return res.status(401).send({ message: 'Invalid token, please log in again' });

        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if (err) return res.status(401).send({ message: 'Invalid token' });

            console.log('Payload:', payload);
            const user = await User.findById(payload.userId);
            console.log('User:', user);
            if (!user) return res.status(404).send({ message: 'User not found' });

            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).send({ message: 'Authentication error' });
    }
};

module.exports = authenticate;
