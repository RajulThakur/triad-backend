import express from 'express';
import { getTermsOfService, upsertTermsOfService } from '../controllers/termsOfService.js';

const termsOfServiceRouter = express.Router();

termsOfServiceRouter.route('/').get(getTermsOfService);
termsOfServiceRouter.route('/').put(upsertTermsOfService);

export default termsOfServiceRouter