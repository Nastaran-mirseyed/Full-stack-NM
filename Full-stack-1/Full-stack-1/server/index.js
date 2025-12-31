import express from "express";
import "dotenv/config";
import cors from "cors";
import logger from "./middleware/logger.js";
import connectionDB from "./database/connectDB.js";
import taskroutes from "./routes/task.route.js";
import directoryroutes from "./routes/directory.route.js";
import userroutes from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(logger)
app.use(express.json())

app.get("/", (req, res) => {
  res.send({ msg: "welcome to todoList REST API" });
});

app.use("/task", taskroutes);
app.use("/directory", directoryroutes);
app.use("/user", userroutes)

app.use((req, res) => {
    res.status(404).send({ error: 404, msg: "not found" })
});

const start = async () => { 
    try {
    
        await connectionDB(process.env.MONGO_URL);
        console.log("database connected");
        
    
        app.listen(port, () => {
            console.log("server is running on port", port);
        
        });    
    } catch (error) {
        console.log("error :",error);
        
    }

}

start()