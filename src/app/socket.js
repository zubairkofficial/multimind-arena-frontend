// socket.js
import { io } from "socket.io-client";

let socket;

export const initiateSocketConnection = () => {
    if (!socket) {
        socket = io("http://localhost:8080"); // Update with your socket server URL
        console.log("Socket connected");
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
    }
};

export const getSocket = () => socket;