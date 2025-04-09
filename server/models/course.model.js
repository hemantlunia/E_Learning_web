import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
   
   
},{timestamps:true});

export const Course = mongoose.model("Course",courseSchema);