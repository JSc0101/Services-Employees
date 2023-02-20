import { Request, Response } from "express";
import { prisma } from "../connection/script.connect";

export const getEmployees = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.json(users);
};