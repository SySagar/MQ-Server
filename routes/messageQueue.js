import express from 'express';
import subscribeMessage from '../controllers/subscriberController.js';
import publishMessage from '../controllers/publisherController.js';
import getBasicMessage from '../controllers/getAllMessagesController.js';

const router = express.Router()

router.get("/mq",getBasicMessage );
router.post("/mq/publish",publishMessage );
router.get("/mq/subscribe",subscribeMessage );

export default router;