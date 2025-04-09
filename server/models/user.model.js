import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:"Hi, How are You?"
    },
    role:{
        type:String,
        enum:["student","structor"],
        default:"student"
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png"
    }
},{timestamps:true});

export const User = mongoose.model("User",userSchema);