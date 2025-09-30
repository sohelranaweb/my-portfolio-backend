import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({
      message: "User Created Successfully!!",
      data: user,
    });
  } catch (error) {
    console.log("Created User Faild", error);
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const admin = await UserService.getMe();
    res.status(200).json({
      message: "Admin Retrieved Successfully!!",
      data: admin,
    });
  } catch (error) {
    console.log("Admin Retrieved Faild", error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const updatedData = await UserService.update(req.body);
    res.status(200).json({
      message: "Admin Updated Successfully!!",
      data: updatedData,
    });
  } catch (error) {
    console.log("Admin updated Faild", error);
  }
};
const deleteAdmin = async (req: Request, res: Response) => {
  try {
    await UserService.deleteAdmin(Number(req.params.id));
    res.status(200).json({
      message: "Admin deleted Successfully!!",
      data: null,
    });
  } catch (error) {
    console.log("Admin deleted Faild", error);
  }
};

export const UserController = {
  createUser,
  getMe,
  update,
  deleteAdmin,
};
