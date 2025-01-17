import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express";
import IUser from "../interfaces/userInterface";
import IRequestCustom from '../interfaces/requestCustomInterface';
import UserRepository from "../repository/userRepository";

export const isUserVerified = (req: IRequestCustom, res: Response, next: NextFunction): Promise<Response>  => {
    const token = req.cookies.token;
    if (!token) return Promise.resolve(res.json({ Error: 'Access Denied' }));
    jwt.verify(token, process.env.JWT_SECRET ?? '', (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) return Promise.resolve(res.json({ Error: 'Access Denied' }));
        req.user = decoded as IUser;
        next();
    });
    return Promise.resolve(res.json({ Error: 'Access Denied' }));
};

class UserService {
    async createUser(userData: IUser): Promise<IUser> {
        const existingUser = await UserRepository.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        return await UserRepository.createUser(userData);
    }

    async updateUser(userId: string, updatedData: Partial<IUser>): Promise<IUser | null> {
        const user = await UserRepository.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return await UserRepository.updateUser(userId, updatedData);
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        const user = await UserRepository.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return await UserRepository.deleteUser(userId);
    }

    async getUserById(userId: string): Promise<IUser | null> {
        return await UserRepository.findUserById(userId);
    }
}

export default new UserService();
