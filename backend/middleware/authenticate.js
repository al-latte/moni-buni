import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticate = async (request, response, next) => {
    try {
        const token = request.cookies.jwt;
  
        if (!token) {
            return response.status(401).json({ message: 'No token, authorization denied' });
        }
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            response.status(401).json({ error: 'Token is not valid' });
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user) {
            return response.status(404).json({error: "User not found"})
        }

        request.user = user

        next();

    } catch (error) {
        console.log("Error in authenticate middleware", error.message);
        response.status(500).json({ error: "Internal server error" });
    }
  };

  export default authenticate
  