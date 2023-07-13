import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(user: { sub: string; username: string }, id: string) {
    try {
      const chat = await this.prisma.chat.create({
        data: {
          users: {
            connect: {
              id: user.sub
            },
          }
        },
      });
      return this.getConversation(user.sub,chat.id);
    } catch (error) {
      throw error;
    }
  }
  async sendMessage(data: {
    message: string;
    senderId: string;
    chatId: string;
  }) {
    try {
      const msg = await this.prisma.message.create({
        data: {
          content: data.message,
          sender: {
            connect: {
              id: data.senderId,
            },
          },
          chat: {
            connect: {
              id: data.chatId,
            },
          },
        },
      });
      return msg;
    } catch {
      throw new UnauthorizedException();
    }
  }
  async getConversation(userId: string, chatId: string) {
    const conversation = await this.prisma.chat.findMany({
      include: {
        users: true
      }
    });

    return conversation;
  }
}
