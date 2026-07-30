"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const client_1 = require("../database/client");
class ChatService {
    static async sendMessage(hospitalId, senderId, receiverId, content, mediaUrl) {
        return client_1.prisma.chatMessage.create({
            data: {
                hospitalId,
                senderId,
                receiverId,
                content,
                mediaUrl,
            },
            include: { sender: true },
        });
    }
    static async getMessages(hospitalId, userId1, userId2) {
        return client_1.prisma.chatMessage.findMany({
            where: {
                hospitalId,
                OR: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 },
                ],
            },
            orderBy: { createdAt: 'asc' },
            include: { sender: true },
        });
    }
}
exports.ChatService = ChatService;
