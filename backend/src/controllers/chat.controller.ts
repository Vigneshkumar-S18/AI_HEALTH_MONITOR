import { Response, NextFunction } from 'express';
import { ChatService } from '../services/chat.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class ChatController {
  static async send(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { receiverId, content, mediaUrl } = req.body;
      const message = await ChatService.sendMessage(
        req.hospitalId!,
        req.user!.userId,
        receiverId,
        content,
        mediaUrl
      );
      return sendResponse(res, 201, true, 'Chat message sent', message);
    } catch (error) {
      next(error);
    }
  }

  static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const messages = await ChatService.getMessages(
        req.hospitalId!,
        req.user!.userId,
        userId
      );
      return sendResponse(res, 200, true, 'Chat conversation history retrieved', messages);
    } catch (error) {
      next(error);
    }
  }
}
