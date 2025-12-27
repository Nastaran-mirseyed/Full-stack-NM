import { Router } from "express";
import { getAllDirectory, updateDirectory, createDirectory, deleteDirectory } from "../controllers/directory.controller.js";

const router = Router();

router.get("/", getAllDirectory);
router.post("/", createDirectory);
router.patch("/:id", updateDirectory);
router.delete("/:id", deleteDirectory);

export default router;