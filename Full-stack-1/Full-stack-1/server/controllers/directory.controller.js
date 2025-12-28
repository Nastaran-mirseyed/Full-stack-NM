import Directory from "../models/directory.model.js";

const getAllDirectory = async (req, res) => {
    try {
        const response = await Directory.find();
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).end();
        
    }
}

const createDirectory = async (req, res) => {
    const data = req.body;
    try {
        const response = await Directory.create(data);
        res.status(201).json(response);      
        
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const updateDirectory = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const response = await Directory.findByIdAndUpdate(id, data);
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const deleteDirectory = async (req, res) => {
    const { id } = req.params;
    try {
        await Directory.findByIdAndDelete(id);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
export {getAllDirectory,createDirectory,deleteDirectory,updateDirectory}