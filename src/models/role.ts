import mongoose, {model} from 'mongoose';
const { Schema } = mongoose;

interface IRole {
    id: Number;
    code: string;
}

const roleSchema = new Schema<IRole>({
    id: { type: Number, required: true },
    code: { type: String, required: true },
});

const User = model<IRole>('Role', roleSchema);
