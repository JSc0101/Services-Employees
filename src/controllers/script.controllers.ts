import { Request, Response } from "express";
import { prisma } from "../connection/script.connect";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const saveEmployees = async (req: Request, res: Response) => {
  try {
    const {
      email,
      name,
      post: { title, content },
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        posts: {
          create: {
            title: title,
            content: content,
          },
        },
      },
    });
    return res.status(200).json({
      POST: {
        data: {
          email: newUser.email,
          name: newUser.name,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const employeesById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export const updateEmployees = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const id = parseInt(req.params.id);

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        name: name,
      },
    });
    return res.status(200).json({ message: "user update" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteEmployees = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const employeesDelete = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return res.json({
      delete: {
        ...employeesDelete,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "error server",
    });
  }
};
