import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import prisma from "../lib/prisma.js";

const getTermsOfService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const terms = await prisma.termsOfService.findFirst();

    if (!terms) {
      return next(
        createHttpError(404, "Terms of Service not set yet")
      );
    }

    return res.status(200).json(terms);
  } catch (error) {
    console.log(error);
    return next(
      createHttpError(500, "Failed to fetch Terms of Service")
    );
  }
};

const upsertTermsOfService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, effectiveDate } = req.body || {};

    if (!content || !effectiveDate) {
      return next(
        createHttpError(400, "Content and effectiveDate are required")
      );
    }

    const existing = await prisma.termsOfService.findFirst();

    const terms = existing
      ? await prisma.termsOfService.update({
          where: { id: existing.id },
          data: {
            content,
            effectiveDate,
          },
        })
      : await prisma.termsOfService.create({
          data: {
            content,
            effectiveDate,
          },
        });

    return res.status(200).json(terms);
  } catch (error) {
    console.log(error);
    return next(
      createHttpError(500, "Failed to save Terms of Service")
    );
  }
};

export { getTermsOfService, upsertTermsOfService };
