import {Router} from 'express';
import * as MessagesController from '../controllers/messages.controller';

const router = new Router();

// Get all Messages
router.route('/messages').get(MessagesController.getMessages);

export default router;
