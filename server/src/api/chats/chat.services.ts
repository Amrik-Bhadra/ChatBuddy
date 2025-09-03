import { chatRepository } from "./chat.repository";
import { CreateChatDto } from "./chat.dto";

type ChatRepository = typeof chatRepository;

class ChatService {
    private repository: ChatRepository;

    constructor(repository: ChatRepository){
        this.repository = repository;
    }

    async getAllChats() {
        return await this.repository.findAll();
    }

    async createChat(chatData: CreateChatDto) {
        return await this.repository.create(chatData);
    }
}

export const chatService = new ChatService(chatRepository);