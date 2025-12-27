import { Router } from "express";
import { getAllTask, getAllTaskByDirID, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";


const router = Router();

router.get("/", getAllTask);
router.get("/:dirId", getAllTaskByDirID);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete('/:id', deleteTask);

export default router;