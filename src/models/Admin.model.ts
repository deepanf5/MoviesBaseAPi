import { Schema, model, Document } from "mongoose";

export interface IAdmin extends Document {

   userName:string,
   email:string,
   password:string,
   createTime:Date,
   isMoiveBaseAdmin:Boolean
}


const AdminSchema = new Schema<IAdmin>({

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
        maxLength: 255,
        unique:true
    },
    password :{
        type:String,
        required:true,
        minlength:4,
        maxlength:50

    },
    createTime:{
        type:Date,
        required:true,
        default:Date.now
    },
    isMoiveBaseAdmin:{
        type:Boolean,
        required:true,
    }

})


const Admin = model<IAdmin>('Admin',AdminSchema)

export default Admin