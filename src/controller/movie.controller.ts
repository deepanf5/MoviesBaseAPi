import { Request, Response, } from "express";
import Movie, { IMovie } from "../models/movie.model";
import express from 'express'
import { isAdmin } from "../middleware/auth.middleware";

const router = express.Router();




router.post('/', isAdmin,async (req: Request, res: Response) => {

    try {

        const { title, director, releaseYear, genre, rating, duration, language, country, cast, description, budget, boxoffice } = req.body as IMovie;
        if (!title 
            || !director 
            || !releaseYear 
            || !genre 
            || !rating
            || !duration 
            || !language 
            || !country 
            || !cast 
            || !description 
            || !budget 
            || !boxoffice 
        ) {
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
            rating,
            duration,
            language,
            country,
            cast,
            description,
            budget,
            boxoffice,
            createAt: Date.now()
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

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            res.status(200).json({movie, message: 'Movie fetched successfully' });
        }
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

router.put('/:id', async (req: Request, res: Response) => {

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.params.title,
            director: req.params.director,
            releaseYear: req.params.releaseYear,
            genre: req.params.genre,
            rating: req.params.rating,
            duration: req.params.duration,
            language: req.params.language,
            country: req.params.country,
            cast: req.params.cast,
            description: req.params.description,
            budget: req.params.budget,
            boxoffice: req.params.boxoffice,
        }, { new: true, runValidators: true })
           res.status(200).json({movie, message: 'Movie fetched successfully'});

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


router.delete('/:id', async (req:Request, res:Response) => {

    try{
         const movie = await Movie.findByIdAndDelete(req.params.id)
          res.status(200).json({movie, message: 'Movie Deleted successfully'});
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
}})


export default router

