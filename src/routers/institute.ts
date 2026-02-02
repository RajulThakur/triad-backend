import express from 'express';
import { createInstitution, getAllInstitutions, updateInstitution } from '../controllers/institute.js';
import { upload } from '../config/multer.js';

const instituteRouter = express.Router();

instituteRouter.get("/", getAllInstitutions);
instituteRouter.post("/", upload.single("logo"), createInstitution);
instituteRouter.put("/:id", upload.single("logo"), updateInstitution);


export default instituteRouter;
