import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config({});

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

export const uploadMedia = async(file,res)=>{
    try {
        const uploadResponse = await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        });
        return uploadResponse;
    } catch (error) {
        console.log(error);       
        return res.status(500).json({
            success:false,
            message:`Server error : ${error?.message}`
        })
    }
};

export const deleteMediaFromCloudinary = async(publicId,res)=>{
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error);       
        return res.status(500).json({
            success:false,
            message:`Server error : ${error?.message}`
        })
    }
};

export const deleteVideofromCloudinary = async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"})
    } catch (error) {
        console.log(error);       
        return resizeBy.status(500).json({
            success:false,
            message:`Server error : ${error?.message}`
        })
    }
}