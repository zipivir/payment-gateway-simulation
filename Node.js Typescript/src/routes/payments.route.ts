import { Router } from 'express';
import paymentsController from '../controllers/payments.controller';
import paramsValidation from '../middleware/params-validation';

const router = Router();

router.get('/chargeStatuses', paymentsController.chargeStatuses);

router.post('/charge', [paramsValidation.auth, paramsValidation.chargeSchema], paymentsController.charge);

export default router;