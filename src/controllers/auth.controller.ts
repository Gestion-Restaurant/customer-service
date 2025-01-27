import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CONSTANTS } from '../utils/constants';
import UserSchema from '../models/userSchema';
import IUser from '../interfaces/userInterface';
import { hashPassword } from '../utils/passwordUtils';
import bcrypt from 'bcrypt';

// Register Controller
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, role, description, address, openingTime, closingTime }: IUser = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user already exists
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        console.log(req.body)

        const token = jwt.sign(
            { name, email, role },
            process.env.JWT_SECRET ?? '',
            { expiresIn: CONSTANTS.JWT_EXPIRY }
        );

        let hashedPassword: string = await hashPassword(password);

        // Create new user
        const newUser = new UserSchema({
            name,
            email,
            password: hashedPassword, // Note: You should hash this password before saving
            role,
            sessionToken: token,
            verified: false,
            address,
            description,
            openingTime,
            closingTime
        });

        try {
            await newUser.save();
            return res.status(201).json({ status: 'Success' });
        } catch (err) {
            return res.status(400).json({ error: 'Error creating user' });
        }
        
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
};

// Login Controller
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token with user id and email
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET ?? '',
            { expiresIn: CONSTANTS.JWT_EXPIRY }
        );

        // Update user's session token
        user.sessionToken = token;
        await user.save();

        return res.status(200).json({
            status: 'Success',
            data: {
                token,
                user: {
                    "id": user._id,
                    "email": user.email,
                    "role": user.role,
                    "name": user.name
                }
            }
        });
    } catch (err) {
        return res.status(500).json({ error: 'Login failed' });
    }
};

// Verify Controller
export const verifyUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, token } = req.params;

        if (!email || !token) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        return new Promise((resolve) => {
            jwt.verify(token, process.env.JWT_SECRET ?? '', async (err) => {
                if (err) {
                    resolve(res.status(401).json({ error: 'Invalid token' }));
                    return;
                }

                await UserSchema.updateOne({ email }, { isVerified: true });
                resolve(res.status(200).json({ status: 'Success' }));
            });
        });
    } catch (err) {
        return res.status(500).json({ error: 'Verification failed' });
    }
};
