import jwt from "jsonwebtoken"

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).json({
                success:false,
                message:"token not found"
            })
        }

        const decode = await jwt.verify(token,process.env.JWT);
        if (!decode) {
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        req.id = decode.userId;
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `server error while Authenticating user : ${error?.message}`,
          });
    }
};

export default isAuthenticated;