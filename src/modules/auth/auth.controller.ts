import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginEmailAndPassword(req.body);
    res.status(201).json({
      message: "User Login Successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const AuthController = {
  loginEmailAndPassword,
};
