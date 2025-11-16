import { Schema, model, Document, SchemaType } from "mongoose";

export interface IMovie extends Document {

    title: string;
    director: string;
    releaseYear: number;
    genres: string;
    rating: number;
    createAt:Date
}


const movieSchema = new Schema<IMovie>({

    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 255
    },
    director: {

        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    releaseYear:{
        type:Number,
        required:true,
        min:1888
    },
    genres:{

        type:String,
        required:true,
    },
    rating: {
        type:Number,
        min:0,
        max:10,
        required:true,
        default:0
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})


const Movie = model<IMovie>('Movie',movieSchema)

export default Movie