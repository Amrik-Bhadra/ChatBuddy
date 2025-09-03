import { Router } from "express";
import { chatController } from "./chat.controller";

const router = Router();

// Handles GET requests to /api/chats
router.get('/', chatController.getAllChats);

// Handles POST requests to /api/chats
router.post('/', chatController.createChat);

export default router;