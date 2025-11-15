import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
dotenv.config();

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    const apiKey = req.headers['x-api-key']

    if (apiKey && apiKey === process.env.ADMIN_API_KEY) next()
    res.status(403).json({
        "status": 403,
        "error": "Forbidden",
        "message": "You do not have permission to access this resource."
    })
}