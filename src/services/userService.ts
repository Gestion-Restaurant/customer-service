import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express";
import IUser from "../interfaces/userInterface";
import IRequestCustom from '../interfaces/requestCustomInterface';

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