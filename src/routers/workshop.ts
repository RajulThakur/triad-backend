import express from 'express';
import { createWorkshop, deleteWorkshop, getAllWorkshops, updateWorkshop } from '../controllers/workshop.js';
import { upload } from '../config/multer.js';

const workshopRouter = express.Router();

workshopRouter.get('/', getAllWorkshops);
workshopRouter.post('/', upload.single('coverImage'), createWorkshop);
workshopRouter.put('/:id', upload.single('coverImage'), updateWorkshop);
workshopRouter.delete('/:id', deleteWorkshop);

export default workshopRouter;
