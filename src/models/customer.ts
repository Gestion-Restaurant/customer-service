import mongoose, {model} from 'mongoose';
const { Schema } = mongoose;

interface IUser {
    id: Number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    roleId: Number;
}

const userSchema = new Schema<IUser>({
    id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    roleId: { type: Number, required: true },
});

const User = model<IUser>('User', userSchema);
