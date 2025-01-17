import UserSchema from '../models/userSchema';
import IUser from "../interfaces/userInterface";
import mongoose from "mongoose";

class UserRepository {
    async createUser(userData: IUser): Promise<IUser> {
        const newUser = new UserSchema(userData);
        return await newUser.save();
    }

    async findUserById(userId: string): Promise<IUser | null> {
        return UserSchema.findById(new mongoose.Types.ObjectId(userId));
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return UserSchema.findOne({email});
    }

    async updateUser(userId: String, updatedData: Partial<IUser>): Promise<IUser | null> {
        return UserSchema.findByIdAndUpdate(userId, updatedData);
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        return UserSchema.findByIdAndDelete(userId);
    }
}

export default new UserRepository();