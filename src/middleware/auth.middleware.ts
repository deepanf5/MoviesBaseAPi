import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import { jwtVerify } from 'jose';
dotenv.config();


const secret = new TextEncoder().encode(process.env.jwtPrivateKey);

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {

    // const authHeader  = req.headers['authorization']


    // if (!authHeader) {
    //   return res.status(401).json({
    //     status: 401,
    //     error: 'Unauthorized',
    //     message: 'No token provided'
    //   });
    // }

    // if (authHeader) {
    //     const { payload } = await jwtVerify(authHeader, secret);
    //     console.log(payload)
    //     if(payload.role) {
    //         next()
    //     }
    // }
    // else {
    //     res.status(403).json({
    //     "status": 403,
    //     "error": "Forbidden",
    //     "message": "You do not have permission to access this resource."
    // })

    // }

    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                status: 401,
                error: 'invalid user or',
                message: 'Invalid or expired token'
            });
        }
        const { payload } = await jwtVerify(authHeader, secret);

        if (payload.adminRole) {
            next()

        }
    }
    catch (err: any) {

          if (err.code === 'ERR_JWT_EXPIRED') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
        message: 'Token has expired'
      });
    }

        return res.status(401).json({
            status: 401,
            error: 'Unauthorized',
            message: 'Invalid or expired token'
        });
    }
}