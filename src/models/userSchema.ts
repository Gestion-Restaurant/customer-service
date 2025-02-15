import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/userInterface';

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'chef', 'delivery'], required: true },
    sessionToken: { type: String, required: true },
    verified: { type: Boolean, required: true },
    // Chef specific fields
    address: {type: String},
    description: {type: String},
    openingTime: {type: String},
    closingTime: {type: String},
});

export default mongoose.model<IUser>('users', UserSchema);