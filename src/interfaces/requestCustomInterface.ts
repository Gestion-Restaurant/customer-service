import { Request } from "express";
import IUser from "./userInterface";

interface IRequestCustom extends Request {
    user: IUser;
};

export default IRequestCustom;