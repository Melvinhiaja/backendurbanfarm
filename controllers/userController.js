const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = {

    async register(req, res) {
        try {
            const { name, email, password, roleId } = req.body;

            if (!name || !email || !password || !roleId) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: 'Email already registered.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                roleId,
            });

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (err) {
            console.error('Register Error:', err);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },


    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id, roleId: user.roleId },
                JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.json({ message: 'Login successful', token });
        } catch (err) {
            console.error('Login Error:', err);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },


    async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'roleId']
            });
            res.json(users);
        } catch (err) {
            console.error('GetAllUsers Error:', err);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
};
