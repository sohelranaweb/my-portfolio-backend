import { error } from "console";
import { prisma } from "../../config/db";
import bcrypt from "bcrypt";

const loginEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw error("User not Found");
  }
  if (user.role !== "ADMIN") {
    throw error("You are not Permitted");
  }

  // Match Password using bcrypt
  const isPasswordMatched = await bcrypt.compare(password, user.password!);
  if (!isPasswordMatched) {
    throw error("Invalid Credentials");
  }
  return user;
};

export const AuthService = {
  loginEmailAndPassword,
};
