"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chat_service_1 = require("../services/chat.service");
const response_1 = require("../utils/response");
class ChatController {
    static async send(req, res, next) {
        try {
            const { receiverId, content, mediaUrl } = req.body;
            const message = await chat_service_1.ChatService.sendMessage(req.hospitalId, req.user.userId, receiverId, content, mediaUrl);
            return (0, response_1.sendResponse)(res, 201, true, 'Chat message sent', message);
        }
        catch (error) {
            next(error);
        }
    }
    static async list(req, res, next) {
        try {
            const { userId } = req.params;
            const messages = await chat_service_1.ChatService.getMessages(req.hospitalId, req.user.userId, userId);
            return (0, response_1.sendResponse)(res, 200, true, 'Chat conversation history retrieved', messages);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ChatController = ChatController;
