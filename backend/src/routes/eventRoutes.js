import { Router } from 'express';
import { createEvent, getAnalyticsSummary } from '../controllers/eventController.js';

const router = Router();

router.post('/', createEvent);
router.get('/analytics/summary', getAnalyticsSummary);

export default router;
