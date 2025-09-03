import prisma from '../../lib/prisma';
import { CreateChatDto } from './chat.dto';

class ChatRepository {

  async findAll() {
    return await prisma.chat.findMany({
      include: {
        // Include the participants' details in the result
        participants: {
          select: { id: true, name: true, avatarUrl: true },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async create(chatData: CreateChatDto) {
    const { name, isGroup = false, participantIds } = chatData;

    if (participantIds.length < 1) {
      throw new Error("A chat must have at least one participant.");
    }

    return await prisma.chat.create({
      data: {
        name,
        isGroup,
        // Connect the chat to the participants using their IDs
        participants: {
          connect: participantIds.map((id) => ({ id })),
        },
      },
    });
  }
}

export const chatRepository = new ChatRepository();