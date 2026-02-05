import express from 'express';
import { createCareer, getAllCareers } from '../controllers/career.js';

const careerRouter = express.Router();

careerRouter.route('/').post(createCareer);
careerRouter.route('/').get(getAllCareers);

export default careerRouter;
