import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CONSTANTS } from '../utils/constants';
import UserSchema from '../models/userSchema';
import IUser from '../interfaces/userInterface';


// Get all customers
export const getCustomers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const customers = await UserSchema.find();

        return res.status(200).json({ customers });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}

// Get customers by role
export const getCustomersByRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { role } = req.params;

        if (!role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const customers = await UserSchema.find({ role });

        return res.status(200).json({ customers });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}

// Get customer by ID
export const getCustomerById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const customer = await UserSchema.findById(id);

        return res.status(200).json({ customer });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}