import express from 'express';
import { createCourse } from '../controllers/courses.js';
import { upload } from '../config/multer.js';

const courseRouter = express.Router();

courseRouter.route("/create").post(upload.single('coverImage'), createCourse);

export default courseRouter