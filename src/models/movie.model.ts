import { Schema, model, Document, SchemaType } from "mongoose";

export interface IMovie extends Document {

    title: string;
    director: string;
    releaseYear: number;
    genre : string;
    rating: number;
    duration: number;
    language: string;
    country: string;
    cast:[string];
    description:Number;
    budget:number;
    boxoffice:number;
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
    duration: {
        type:Number,
        min:0,
        max:500,
        required:true
    },
    language:{
        type:String,
        minLength:2,
        maxLength:255,
        required:true
    },
    country: {
          type:String,
        minLength:2,
        maxLength:255,
        required:true

    },
    cast: {
        type:[String],
        required: true
    },
     description: {
        type:String,
        minlength:2,
        max:255,
        required:true
     },
    budget:{
        type:Number,
        minlength:100,
        maxlength:50000,
        required:true

    },
    boxoffice:{
         type:Number,
        minlength:100,
        maxlength:1000000,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})


const Movie = model<IMovie>('Movie',movieSchema)

export default Movie