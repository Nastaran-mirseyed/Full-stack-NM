import { Schema, model } from "mongoose";

const userModel = new Schema({
    userName: {
        type: String,
        required:[true,"username is required"]
    },
    email: String,
    password: {
        type: String,
        required:[true,"pass is required"]
    }
})

const User = model("User", userModel);
export default User