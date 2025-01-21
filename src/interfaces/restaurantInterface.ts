import IUser from './userInterface';

interface IRestaurant extends IUser {
    userId: string;
    address: string;
    description: string;
    closingTime: string;
    openingTime: string;
}

export default IRestaurant;