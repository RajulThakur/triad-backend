import express from 'express';
import { createWorkshop } from '../controllers/workshop.js';
import { upload } from '../config/multer.js';

const workshopRouter = express.Router();

workshopRouter.post('/', upload.single('coverImage'), createWorkshop);

export default workshopRouter;
