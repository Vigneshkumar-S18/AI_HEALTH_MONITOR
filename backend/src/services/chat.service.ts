import { prisma } from '../database/client';

export class ChatService {
  static async sendMessage(hospitalId: string, senderId: string, receiverId: string, content: string, mediaUrl?: string) {
    return prisma.chatMessage.create({
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

  static async getMessages(hospitalId: string, userId1: string, userId2: string) {
    return prisma.chatMessage.findMany({
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
