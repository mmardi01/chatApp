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
            create: [
              //userChat
              {
                user: {
                  connect: {
                    id: user.sub,
                  },
                },
              },
              {
                user: {
                  connect: {
                    id: id,
                  },
                },
              },
            ],
          },
        },
      });
      return chat;
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
  async getConversation(id: string, chatId: string) {
    const conversation = this.prisma.message.findMany({
      where: {
        userId: id,
        chatId: chatId,
      },
    });
    return conversation;
  }
}
