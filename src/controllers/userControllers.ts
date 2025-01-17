import { Request, Response } from 'express';
import UserService from '../services/userService';
import IUser from "../interfaces/userInterface";
import {hashPassword} from "../utils/passwordUtils";


export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const { name, email, password }: IUser = req.body;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        let hashedPassword: string = await hashPassword(password);

        const updatedUser = await UserService.updateUser(id, {name, email, password: hashedPassword});

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ status: 'Success', data: updatedUser });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const deletedUser = await UserService.deleteUser(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ status: 'Success', data: deletedUser });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return res.status(500).json({ error: errorMessage });
    }
};