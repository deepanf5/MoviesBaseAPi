import { Request, Response, } from "express";
import Movie, { IMovie } from "../models/movie.model";
import express from 'express'

const router = express.Router();




router.post('/', async (req: Request, res: Response) => {


    try {

        const { title, director, releaseYear, genre, rating } = req.body as IMovie;
        if (!title || !director || !releaseYear) {
            res.status(403).json({
                "status": 403,
                "error": "Error",
                "message": "Title, director, and release year are required'"
            })
        }

        const newMovie = new Movie({
            title,
            director,
            releaseYear,
            genre,
            rating
        })
        const result = await newMovie.save()
        res.status(201).json({ result, message: 'Movie Added successfully' })


    }
    catch (err: any) {
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
            message: 'An unexpected error occurred while processing your request.',
            ReqError: err.message
        });
    }

})


router.get('/', async (req: Request, res: Response) => {
    try {
        const movie = await Movie.find().populate('title')
        if (movie) {
             res.status(200).json(movie); 
        }
    }
    catch(err:any) {
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

