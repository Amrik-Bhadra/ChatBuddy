// src/api/chats/chat.dto.ts
import { z } from 'zod';

// 1. Define the validation schema for creating a new chat.
// This will be used in our controller to validate the request body.
export const createChatSchema = z.object({
  name: z.string().optional(),
  isGroup: z.boolean().default(false),
  participantIds: z
    .array(z.string().cuid({ message: "Invalid user ID format" }))
    .min(1, { message: "A chat must have at least one participant." }),
});

// 2. Infer the TypeScript type from the Zod schema.
// This allows us to use it for type-checking in our code.
export type CreateChatDto = z.infer<typeof createChatSchema>;


// (Optional but good practice) Define the shape of a chat DTO for responses
const participantSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  avatarUrl: z.string().nullable(),
});

export const chatSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  isGroup: z.boolean(),
  participants: z.array(participantSchema),
});

export type ChatDto = z.infer<typeof chatSchema>;