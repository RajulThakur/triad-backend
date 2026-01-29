import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../lib/prisma.js";

const assignMentorsToCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { courseId } = req.params;
  const { mentorIds } = req.body;

  if (!courseId || Array.isArray(courseId)) {
    return next(createHttpError(400, "Course id is required"));
  }

  if (!Array.isArray(mentorIds) || mentorIds.length === 0) {
    return next(createHttpError(400, "mentorIds must be a non-empty array"));
  }

  try {
    // Check course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return next(createHttpError(404, "Course not found"));
    }

    // Check mentors exist
    const mentors = await prisma.mentor.findMany({
      where: {
        id: { in: mentorIds },
      },
      select: { id: true },
    });

    if (mentors.length !== mentorIds.length) {
      return next(createHttpError(400, "One or more mentors are invalid"));
    }

    // Create relations (skip duplicates)
    await prisma.courseMentor.createMany({
      data: mentorIds.map((mentorId: string) => ({
        courseId,
        mentorId,
      })),
      skipDuplicates: true, // important because of @@unique
    });

    return res.status(200).json({
      message: "Mentors assigned to course successfully",
    });
  } catch (error) {
    console.log(error);
    return next(
      createHttpError(500, "Error while assigning mentors to course"),
    );
  }
};

export { assignMentorsToCourse };
