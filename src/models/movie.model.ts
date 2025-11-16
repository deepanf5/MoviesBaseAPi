import { Schema, model, Document, SchemaType } from "mongoose";

export interface IMovie extends Document {

    title: string;
    director: string;
    releaseYear: number;
    genre : string;
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
    genre:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255

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