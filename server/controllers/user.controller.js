import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already register.",
      });
    }

    // hashing Pass
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    return res.status(201).json({
      success: true,
      message: "Account Created successfully.",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error while registring the user : ${error?.message}`,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required.",
      });
    }

    const existuser = await User.findOne({ email });
    if (!existuser) {
      return res.status(404).json({
        success: false,
        message: "User Not found.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, existuser?.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    generateToken(res, existuser, `Welcome back, ${existuser?.name}`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error while login : ${error?.message}`,
    });
  }
};

// logout
export const logout = async(req,res)=>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      success:true,
      message:"Logged out successfully."
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error while logout : ${error?.message}`,
    });
  }
}

// user profile
export const getUserProfile = async(req,res)=>{
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password").populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        success:false,
        message:"Profile not found."
      })
    }
    return res.status(200).json({
      success:true,
      data:user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error while fetching user-profile : ${error?.message}`,
    });
  }
}

// update profile
export const updateProfile = async(req,res)=>{
  try {
    const userId = req.id;
    const {name,bio} = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User not found."
      })
    };
    //  extract public id and delete old pic if exists
    let photoUrl;
    if (profilePhoto) {
      if (user?.photoUrl) {
        const publicId = user?.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId,res)
      }

       // upload new pic
    const cloudRes = await uploadMedia(profilePhoto?.path,res);
    photoUrl = cloudRes?.secure_url;
    }
   

   

    const updateData = {};
    if (name) updateData.name =name;
    if (bio) updateData.bio =bio;
    if (photoUrl) updateData.photoUrl =photoUrl;
    // console.log(updateData);
    
    const updateUser = await User.findByIdAndUpdate(userId,updateData,{new:true});

    return res.status(200).json({
      success:true,
      data:updateUser,
      message:"Profile updated"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error while updating-user Info : ${error?.message}`,
    });
  }
}