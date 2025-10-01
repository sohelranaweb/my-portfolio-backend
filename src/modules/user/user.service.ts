import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";
import bcrypt from "bcrypt";

// const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
//   const userData = await prisma.user.create({ data: payload });
//   return userData;
// };
const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  // 1. password আছে কিনা check করো
  if (!payload.password) {
    throw new Error("Password is required");
  }

  // 2. password hash করো
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // 3. নতুন user create করো, hashed password save হবে
  const userData = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  return userData;
};

const getMe = async () => {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });
  return admin;
};
const update = async (
  id: number,
  payload: Prisma.UserUpdateInput
): Promise<User> => {
  const updatedData = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedData;
};
const deleteAdmin = async (id: number) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const UserService = {
  createUser,
  getMe,
  update,
  deleteAdmin,
};
