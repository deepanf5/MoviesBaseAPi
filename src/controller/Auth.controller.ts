import bcrypt from "bcryptjs";
import { Request, Response, } from "express";
import express from 'express';
import Admin, { IAdmin } from "../models/Admin.model";
const router = express.Router()

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

        let user = await Admin.findOne({ email }) as IAdmin

        if (!user) {
            res.status(400).json({ message: 'Invalid email or Password' })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Success
        res.status(200).json({ message: "Login successful" });
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