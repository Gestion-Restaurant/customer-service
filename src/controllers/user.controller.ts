import { Request, Response } from 'express';
import UserSchema from '../models/userSchema';

// Get all customers
export const getCustomers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const customers = await UserSchema.find();

        return res.status(200).json({ 
            customers: customers.map(customer => ({
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                address: customer.address,
                description: customer.description,
                openingTime: customer.openingTime,
                closingTime: customer.closingTime
            }))
        });
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
        return res.status(200).json({ 
            customers: customers.map(customer => ({
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                address: customer.address,
                description: customer.description,
                openingTime: customer.openingTime,
                closingTime: customer.closingTime
            }))
        });

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
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        
        return res.status(200).json({
            customer: {
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                address: customer.address,
                description: customer.description,
                openingTime: customer.openingTime,
                closingTime: customer.closingTime
            }
        });
        
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}

export const updateCustomer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { name, email, address, description, openingTime, closingTime } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await UserSchema.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (address) user.address = address;
        if (description) user.description = description;
        if (openingTime) user.openingTime = openingTime;
        if (closingTime) user.closingTime = closingTime;

        await user.save();
    
        return res.status(200).json({ user });

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
}