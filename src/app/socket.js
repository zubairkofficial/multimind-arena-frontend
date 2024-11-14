// socket.js
import { io } from "socket.io-client";
import Helpers from "../Config/Helpers";
let socket;

export const initiateSocketConnection = () => {
    if (!socket) {
        socket = io('http://localhost:8080' ?? "http://13.60.19.246"); // Update with your socket server URL
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