import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    try {

        const token = req.header("Authorization");

        if (!token) {
          return  res.status(401).json({error:"Access denied"})
        }

        const tokenParse = token.split(" ")[1]; // for postman

        const decode = jwt.verify(tokenParse, process.env.SECRET_KEY);
        req.userId = decode.userId
        
        next()
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid token" });
        
    }
}
export default authUser;