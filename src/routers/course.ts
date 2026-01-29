import express from 'express';
import {
  createCourse,
  getCourseById,
  updateCourse,
} from '../controllers/courses.js';
import { upload } from '../config/multer.js';

const courseRouter = express.Router();

courseRouter.route('/create').post(upload.single('coverImage'), createCourse);
courseRouter.route('/:courseId').get(getCourseById);
courseRouter.route('/:courseId').put(upload.single('coverImage'), updateCourse);

export default courseRouter;
