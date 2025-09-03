import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Request, Response } from "express";
import chatRoute from "./api/chats/chat.route";
import { initializeSocket } from "./sockets/socketManager";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use('/api/v1/chats', chatRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Everyone');
});

// 2. Initialize the socket manager and pass it the io instance
initializeSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});