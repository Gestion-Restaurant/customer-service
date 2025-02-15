import { Document } from 'mongoose';

interface IDish extends Document {
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    restaurantId: string;
}

export default IDish;