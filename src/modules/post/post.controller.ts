import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.status(201).json({
      message: "Post Created Successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getAllPost();
    res.status(201).json({
      message: "Post Retrieved Successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const PostController = {
  createPost,
  getAllPost,
};
