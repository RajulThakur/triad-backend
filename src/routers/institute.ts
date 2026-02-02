import express from 'express';
import { createInstitution, getAllInstitutions } from '../controllers/institute.js';
import { upload } from '../config/multer.js';

const instituteRouter = express.Router();

instituteRouter.get("/", getAllInstitutions);
instituteRouter.post("/", upload.single("logo"), createInstitution);


export default instituteRouter;
