import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: true,
    },
  });
  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany();
  return result;
};

export const PostService = {
  createPost,
  getAllPost,
};
