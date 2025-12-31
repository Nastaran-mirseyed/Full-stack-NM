import { Router } from "express";
import { getAllUser, signin, deleteUser, updataUser,getAllUserTasks, login } from "../controllers/user.controller.js";
import authUser from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getAllUser);
router.post("/", signin);
router.post("/:login",login)
router.delete("/:id",authUser, deleteUser);
router.patch("/:id",authUser, updataUser);
router.get("/:userId/task",authUser, getAllUserTasks);

export default router;