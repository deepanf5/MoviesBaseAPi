import bcrypt from "bcryptjs";
import { Request, Response, } from "express";
import express from 'express';
import Admin, { IAdmin } from "../models/Admin.model";
const router = express.Router()
import { jwtVerify, SignJWT } from 'jose';
import dotenv from 'dotenv';
dotenv.config();


const secret = new TextEncoder().encode(process.env.jwtPrivateKey);


router.post('/', async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body
        if (!email
            || !password
        ) {
            res.status(403).json({
                "status": 403,
                "error": "Error",
                "message": "Eamil or password  or isMoiveBaseAdmin are required'"
            })
        }

        let adminUser = await Admin.findOne({ email }) as IAdmin
        if (!adminUser) {
            res.status(400).json({ message: 'Invalid email or Password' })
        }
        const isMatch = await bcrypt.compare(req.body.password, adminUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        if (adminUser.isMoiveBaseAdmin) {

        let adminUser = await Admin.findOne({ email }) as IAdmin
            const token = await new SignJWT({ userId:adminUser._id, username: adminUser.userName, adminRole:adminUser.isMoiveBaseAdmin})
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
                .setExpirationTime('30m') // token expires in 30 minutes
                .sign(secret);
            res.status(200).json({ message: "Login successful", token: token });

        }

        // Success
    }
    catch (err: any) {
        res.status(500).json(
            {
                status: 500,
                error: 'Internal Server Error',
                message: err.message,
                ReqError: err.message
            }
        )

    }

})


export default router