import mongoose, { Schema } from "mongoose";

const directoryModel = new Schema({
    title: {
        type: String,
        required: [true, "Title is require"]
    }
});

export default mongoose.model('Directory', directoryModel);
