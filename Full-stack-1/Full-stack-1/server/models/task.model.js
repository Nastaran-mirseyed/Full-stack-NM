import mongoose, { model, Schema } from "mongoose";

const taskModel = new Schema({
    title: {
        type: String,
        required:[true,"title is required"]
    },
    deadline: {
        type: Date,
        required:[true,"date is required"]
    },
    dirId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Directory"
    },
    description: String,
    completed: Boolean,
    important:Boolean,
    
})

const Task = model("Task", taskModel);
export default Task;