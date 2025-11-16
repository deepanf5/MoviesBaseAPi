import { Schema, model, Document } from "mongoose";

export interface Admin extends Document {

   userName:String,
   email:String,
   password:String,
   createTime:Date
}


const AdminSchema = new Schema<Admin>({

    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    password :{
        type:String,
        required:true

    },
    createTime:{
        type:Date,
        required:true,
        default:Date.now
    }

})


const Admin = model<Admin>('Admin',AdminSchema)

export default Admin