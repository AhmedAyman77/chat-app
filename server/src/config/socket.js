import http from "http";
import ENV from "./env.js";
import express from "express";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";


const app = express();
const httpServer = http.createServer(app); // create one http server to serve both http and socket.io
const io = new Server(httpServer, {
    cors: {
        origin: [ENV.CLIENT_URL],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }
})

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// storing online users
const onlineUsers = {}; // { userId: socketId }

// check if the user is online or not
export function getReceiverSocketId(userId) {
    return onlineUsers[userId];
}

io.on("connection", (socket) => { // socket is the connected client
    console.log("online users:", onlineUsers);
    console.log("A user connected", socket.user.fullName);

    const userId = socket.userId;
    onlineUsers[userId] = socket.id; // add user to online users

    // io.emit is used to send events to all connected clients
    io.emit("onlineUsers", Object.keys(onlineUsers)); // broadcast online users to all connected clients

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.fullName);
        delete onlineUsers[userId];
        io.emit("onlineUsers", Object.keys(onlineUsers)); // broadcast online users to all connected clients
    })
})

export { io, app, httpServer }