import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteVideofromCloudinary } from "../utils/cloudinary.js";

export const createLecture = async(req,res)=>{
    try {
        const {lectureTitle} = req.body;
        // console.log("ok");
        
        const {courseId} = req.params;
        if (!lectureTitle || !courseId) {
            return res.status(404).json({
                message: "Lecture-Title is required",
                success:false
              });
        }
        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)
        if (course) {
            course.lectures.push(lecture?._id);
            await course.save();
        }
        return res.status(201).json({
            data:lecture,
            success:true,
            message:"Lecture created." 
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create Lecture." +error?.message,
            success:false
          });
    }
};


// get lecture
export const getCourseLecture = async(req,res)=>{
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(404).json({
                message: "Course not found.",
                success:false
              });
        }
        return res.status(200).json({
            success:true,
            data:course?.lectures
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get Lecture." +error?.message,
            success:false
          });
    }
};

// update lecture
export const editLecture = async(req,res)=>{
    try {
        const {lectureTitle,videoInfo,isPreviewFree} = req.body;
        const {courseId,lectureId} = req.params;
        // console.log(lectureTitle,videoInfo,isPreviewFree);
        

        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found.",
                success:false
              });
        }
        if(lectureTitle) lecture.lectureTitle = lectureTitle;
        if(videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if(videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
        if(String(isPreviewFree)) lecture.isPreviewFree = isPreviewFree;
        await lecture.save();

        const course = await Course.findById(courseId)
        if (course && !course.lectures.includes(lecture?._id)) {
            course.lectures.push(lecture?._id);
            await course.save();
        }

        return res.status(200).json({
            success:true,
            data:lecture,
            message:"Lecture Updated."
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to Update Lecture." +error?.message,
            success:false
          });
    }
};

// remove lecture
export const removeLecture = async(req,res)=>{
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(404).json({
                success:false,
                message:"Lecture not found."
            })
        }

        if (lecture?.publicId) {
            await deleteVideofromCloudinary(lecture?.publicId)
        }

        await Course.updateOne({lectures:lectureId},{$pull:{lectures:lectureId}})
        return res.status(200).json({
            success:true,
            message:"Lecture removed."
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to Remove Lecture." +error?.message,
            success:false
          });
    }
};

// get lecture by id
export const getLectureById = async(req,res)=>{
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId);
        // console.log(lecture);
        
        if (!lecture) {
            return res.status(404).json({
                success:false,
                message:"Lecture not found."
            })
        }
        return res.status(200).json({
            data:lecture,
            success:true,
            message:"Lecture found."
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "Failed to Get Lecture." +error?.message,
            success:false
          });
    }
}