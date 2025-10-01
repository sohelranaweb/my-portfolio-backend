import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getMe);
router.patch("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.deleteAdmin);

export const userRouter = router;
