import bcrypt from "bcryptjs";
import { Request, Response, } from "express";
import express from 'express';
import Admin, { IAdmin } from "../models/Admin.model";
const router = express.Router()


router.post('/', async (req: Request, res: Response) => {

    try {

        
        const { userName, email, password, isMoiveBaseAdmin } = req.body as IAdmin

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if (!userName
            || !email
            || !password
            || !isMoiveBaseAdmin
        ) {
            res.status(403).json({
                "status": 403,
                "error": "Error",
                "message": "Eamil or password  or isMoiveBaseAdmin are required'"
            })
        }

        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            isMoiveBaseAdmin,
        })
        const result = await newAdmin.save()
        res.status(201).json({ result, message: 'Admin Added successfully' })
    }
    catch (err) {

    }

})


router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id)
        res.status(200).json({ admin, message: 'Admin Deleted successfully' });
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