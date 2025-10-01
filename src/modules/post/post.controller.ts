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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const result = await PostService.getAllPost({
      page,
      limit,
      search,
      isFeatured,
      tags,
    });
    res.status(200).json({
      message: "Post Retrieved Successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const post = await PostService.getSinglePost(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({
      message: "Single Post Retrieved Successfully!!",
      data: post,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await PostService.updatePost(Number(req.params.id), req.body);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({
      message: "Post updated Successfully!!",
      data: post,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await PostService.deletePost(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({
      message: "Post deleted Successfully!!",
      data: post,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getBlogStat = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getBlogStat();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats", details: err });
  }
};

export const PostController = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  getBlogStat,
};
