import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import prisma from '../lib/prisma.js';

const createTool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, url } = req.body;

    if (!name || !description || !url) {
      return next(createHttpError(400, 'All fields are required'));
    }

    const tool = await prisma.tool.create({
      data: {
        name,
        description,
        url,
      },
    });

    return res.status(201).json(tool);
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Error while creating tool'));
  }
};

const getAllTools = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(tools);
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Error while fetching tools'));
  }
};

export { createTool, getAllTools };
