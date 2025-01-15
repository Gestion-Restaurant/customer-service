import { Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'client' | 'chef' | 'delivery';
    sessionToken: string;
    verified: boolean;
}

export default IUser;