import  Task from "../models/task.model.js";

const getAllTask = async (req,res) => {
    try {
        const response = await Task.find();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const getAllTaskByDirID = async (req, res) => {
    const { dirId } = req.params;

    try {
        const response = await Task.find({ dirId: dirId });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).end();
        
    }
}

const createTask = async (req, res) => {
    const data = req.body;

    try {
        const response = await Task.create(data);
        res.status(201).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).end();        
    }
}

const updateTask = async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    try {
        const response = await Task.findByIdAndUpdate(id, data);
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await Task.findByIdAndDelete(id);
        res.status(200).end()
        
    } catch (error) {
        console.log(error);
        res.status(500).end();        
    }
}

export { getAllTask, getAllTaskByDirID, createTask, updateTask, deleteTask };