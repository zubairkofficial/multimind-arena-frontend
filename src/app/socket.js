// socket.js
import { io } from "socket.io-client";
import Helpers from "../Config/Helpers";
let socket;

export const initiateSocketConnection = () => {
    if (!socket) {
        socket = io(Helpers.basePath); // Update with your socket server URL
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};

export const getSocket = () => socket;