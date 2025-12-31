import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthUser from "../middleware/verifyToken.js";
import crypto from "crypto";

const getAllUser = async (req,res) => {
    try {

        const response = await User.find();
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).end();
        
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {

        await User.findByIdAndDelete(id);
        res.status(200).end()
        
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const getAllUserTasks = async (req, res) => {
    const { userId } = req.params;
    try {

        const response = await User.find({ userId: userId });
        res.status(200).json(response)

        
    } catch (error) {
        console.log(error);
        res.status(500).end();        
    }
}

const updataUser = async (req, res) => {
    const { id } = req.params;
    const { password, ...restofthedata } = req.body;
    let restData = { ...restofthedata };

    try {
        

        if (password) {
            const hashedPasswordAgain = await bcrypt.hash(password, 10);
            restData.password = hashedPasswordAgain;
            
        }

        const updateduser = await User.findByIdAndUpdate(id, restData,{new:true});

        res.status(200).json({
            msg: "user updated successfully",
            user: {
                userName: updateduser.userName,
                email: updateduser.email,
                password:updateduser.password
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const signin = async (req, res) => {
    const {password,...restofthedata} = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            ...restofthedata,
            password:hashedPassword
        })

        res.status(201).json({
            msg: "user signin succssesfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                userName: newUser.userName,
                password:newUser.password
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const login = async (req, res) => {
    const { email,password } = req.body;
    try {

        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({msg:"404 not found"})
            
        }

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            res.status(404).res({msg:"404 not found"})
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "24h" });

        res.status(200).json({msg:"Welcom",token})
        
    } catch (error) {
        console.log(error);
        res.status(500).end();        
    }
}



export {getAllUser,getAllUserTasks,signin,deleteUser,updataUser,login}