import jwt from "jsonwebtoken";

export const generateToken = async (res, user, message) => {
  try {
    const token = jwt.sign({ userId: user?._id }, process.env.JWT, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      }).json({
        success:true,
        message,
        user
      });
  } catch (error) {
   return res.status(500).json({
    success:false,
    message:`Error while generating token : ${error?.message}`
   })
  }
};
