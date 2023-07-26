import express from 'express';
import subscribeMessage from '../controllers/subscriberController.js';
import publishMessage from '../controllers/publisherController.js';
import getBasicMessage from '../controllers/getAllMessagesController.js';
import publishToSelected from '../controllers/publishToSelected.js';
import subscribeForSelected from '../controllers/subscribeForSelected.js';

const router = express.Router()

router.get("/mq",getBasicMessage );
router.post("/mq/publish",publishMessage );
router.post("/mq/subscribe",subscribeMessage );
router.post("/mq/publishSelected",publishToSelected );
router.post("/mq/subscribeSelected",subscribeForSelected );

export default router;