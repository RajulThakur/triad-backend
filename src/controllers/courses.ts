import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import prisma from '../lib/prisma.js';
import {
  deleteOnCloudinary,
  uploadonCloudinary,
} from '../config/cloudinary.js';
import { getPublicId } from '../lib/cloudinary.js';

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      category,
      description,
      durationDays,
      level,
      commitmentHours,
      originalPrice,
      discountedPrice,
      features,
    } = req.body;

    const coverImageFile = req.file;

    if (!coverImageFile) {
      return next(createHttpError(400, 'Cover image is required'));
    }

    const image = await uploadonCloudinary(coverImageFile.path, {
      folder: 'courses',
    });

    if (!image) {
      return next(createHttpError(500, 'Image upload failed'));
    }

    // Parse features
    let parsedFeatures: string[] = [];

    if (typeof features === 'string') {
      try {
        // If frontend sends JSON: '["Feature 1","Feature 2"]'
        parsedFeatures = JSON.parse(features);
      } catch {
        // If frontend sends: "Feature 1, Feature 2"
        parsedFeatures = features.split(',').map((f) => f.trim());
      }
    }

    const course = await prisma.course.create({
      data: {
        title,
        coverImage: image.secure_url,
        category,
        description,
        durationDays: Number(durationDays),
        level,
        commitmentHours: Number(commitmentHours),
        originalPrice: Number(originalPrice),
        discountedPrice: Number(discountedPrice),
        features: parsedFeatures,
      },
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, 'Error while creating course'));
  }
};

const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { courseId } = req.params;

  if (!courseId || Array.isArray(courseId)) {
    return next(createHttpError(400, 'Course id is required'));
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return next(createHttpError(404, 'Course not found'));
    }

    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Error while fetching course'));
  }
};

const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { courseId } = req.params;

  if (!courseId || Array.isArray(courseId)) {
    return next(createHttpError(400, 'Course id is required'));
  }

  try {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return next(createHttpError(404, 'Course not found'));
    }

    // Build update object dynamically
    const data: any = {};

    if (req.body.title) data.title = req.body.title;
    if (req.body.category) data.category = req.body.category;
    if (req.body.description) data.description = req.body.description;
    if (req.body.level) data.level = req.body.level;

    if (req.body.durationDays)
      data.durationDays = Number(req.body.durationDays);

    if (req.body.commitmentHours)
      data.commitmentHours = Number(req.body.commitmentHours);

    if (req.body.originalPrice)
      data.originalPrice = Number(req.body.originalPrice);

    if (req.body.discountedPrice)
      data.discountedPrice = Number(req.body.discountedPrice);

    // Features
    if (req.body.features) {
      try {
        data.features = JSON.parse(req.body.features);
      } catch {
        data.features = req.body.features
          .split(',')
          .map((f: string) => f.trim());
      }
    }

    let newImagePublicId: string | null = null;

    // Image replacement (SAFE ORDER)
    if (req.file) {
      // 1. Upload new image first
      const newImage = await uploadonCloudinary(req.file.path, {
        folder: 'courses',
      });

      if (!newImage) {
        return next(createHttpError(500, 'New image upload failed'));
      }

      // 2. Prepare DB update
      data.coverImage = newImage.secure_url;
      newImagePublicId = newImage.public_id;
    }

    // 3. Update DB
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data,
    });

    // 4. Now delete old image safely
    if (req.file && course.coverImage) {
      const oldPublicId = getPublicId(course.coverImage);
      if (oldPublicId) {
        await deleteOnCloudinary(oldPublicId);
      }
    }

    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Error while updating course'));
  }
};


export { createCourse, getCourseById, updateCourse};
