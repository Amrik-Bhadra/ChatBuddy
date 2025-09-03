import { Server, Socket } from "socket.io";

interface ChatMessage{
    author: string;
    message: string;
}

export const initializeSocket = (io: Server) => {
    // Listen for a new client connection
    io.on('connection', (socket: Socket)=>{
        console.log('A user connected:', socket.id);

        // Listen for a "sendMessage" event from a client
        socket.on('sendMessage', (message: ChatMessage)=>{
            console.log('Message received:', message);

            // Broadcast the received message to ALL connected clients
            io.emit('receiveMessage', message);
        });

        // Listen for a client disconnection
        socket.on('disconnect', ()=>{
            console.log('User disconnected:', socket.id);
        });

    });
}