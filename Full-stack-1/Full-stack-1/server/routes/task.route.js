import { Router } from "express";
import { getAllTask, getAllTaskByDirID, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import authUser from "../middleware/verifyToken.js";


const router = Router();

router.get("/", getAllTask);
router.get("/:dirId",authUser, getAllTaskByDirID);
router.post("/",authUser, createTask);
router.patch("/:id",authUser, updateTask);
router.delete('/:id',authUser, deleteTask);

export default router;