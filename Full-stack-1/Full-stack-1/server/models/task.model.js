import mongoose, { Schema } from "mongoose";

const taskModel = new Schema({
    title: {
        type: String,
        required:[true,"title is require"]
    },
    deadline: {
        type: Date,
        required:[true,"date is require"]
    },
    dirId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Direcory"
    },
    description: String,
    completed: Boolean,
    important:Boolean,
    
})

export default  mongoose.model("Task", taskModel);