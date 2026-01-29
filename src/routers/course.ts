import express from 'express';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from '../controllers/courses.js';
import { upload } from '../config/multer.js';

const courseRouter = express.Router();

courseRouter.route('/create').post(upload.single('coverImage'), createCourse);
courseRouter.route('/:courseId').get(getCourseById);
courseRouter.route('/:courseId').put(upload.single('coverImage'), updateCourse);
courseRouter.route('/:courseId').delete(deleteCourse);
courseRouter.route('/').get(getAllCourses)

export default courseRouter;
