// src/api/chats/chat.controller.ts
import { Request, Response } from "express";
import { chatService } from "./chat.services";
import { createChatSchema } from "./chat.dto"; // 1. Import the Zod schema for validation

type ChatService = typeof chatService;

class ChatController {
    private service: ChatService;
    constructor(service: ChatService) {
        this.service = service;
    }

    getAllChats = async (req: Request, res: Response) => {
        try {
            const chats = await this.service.getAllChats();
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ message: "Error fetching chats" });
        }
    }


    createChat = async (req: Request, res: Response) => {
        try {
            // 2. Validate the request body against the schema
            const validation = createChatSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ errors: validation.error.issues });
            }

            // 3. Call the service with the validated data
            const newChat = await this.service.createChat(validation.data);
            
            // 4. Return the new chat with a 201 (Created) status
            res.status(201).json(newChat);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating chat" });
        }
    }
}

export const chatController = new ChatController(chatService);