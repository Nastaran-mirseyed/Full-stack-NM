import{ model, Schema } from "mongoose";

const directoryModel = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    }
});

const Directory = model("Directory", directoryModel);
export default Directory;
