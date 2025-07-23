const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendOtpEmail = require('../helpers/sendOtpEmail');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password, roleId } = req.body;

            
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

           
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

           
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                roleId,
                status: 'inactive', 
                otp,
                otpExpiresAT: new Date(Date.now() + 10 * 60 * 1000) 
            });

            await sendOtpEmail(user.email, otp);

            return res.status(201).json({
                message: 'User registered. OTP sent to email',
                email: user.email
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    verifyOtp: async (req, res) => {
        try {
            const { email, otp } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(404).json({ message: 'User not found' });

            if (user.otp !== otp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

          
            if (user.otpExpiresAT && user.otpExpiresAT < new Date()) {
                return res.status(400).json({ message: 'OTP expired' });
            }

         
            user.status = (user.roleId === 3) ? 'pending_approval' : 'active';
            user.otp = null;
            user.otpExpiresAT = null;

            await user.save();

            return res.status(200).json({
                message: user.status === 'active'
                    ? 'Account verified and activated'
                    : 'Account verified, waiting for admin approval'
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            if (user.status !== 'active') {
                return res.status(403).json({ message: 'Account not yet activated' });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, roleId: user.roleId },
                JWT_SECRET,
                { expiresIn: '1d' }
            );

            return res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roleId: user.roleId,
                    status: user.status
                }
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};
