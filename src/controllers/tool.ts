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


export { createTool };
