import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  async createChat(user: { sub: string; username: string }, id: string) {
    try {

      const users = await this.prisma.user.findUnique({
        where: {
          id:user.sub
        },
        select: {
          chat: {
            include: {
              users: true
            }
          }
        }
      });
      users.chat.map(item => {
          if (item.users[0].id === id && item.users[1].id === user.sub)
            throw new UnauthorizedException('Chat already exist')
          if (item.users[1].id === id && item.users[0].id === user.sub)
            throw new UnauthorizedException('Chat already exist')
      })
      
      const chat = await this.prisma.chat.create({
        data: {
          users: {
            connect: [
              {
                id: user.sub
              }, {
                id: id
              }
            ]
          },

        },
      });
      return this.getConversation(user.sub, chat.id);
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
        include: {
          sender: true
        }
      });
      return msg;
    } catch {
      throw new UnauthorizedException();
    }
  }
  async getConversation(userId: string, chatId: string) {
    const conversation = await this.prisma.chat.findUnique({
      where: {
        id:chatId
      },
      include: {
        users: {
          where:{
            NOT:{
              id:userId
            }
          }
        },
        messages: {
          include: {
            sender: true
          }
        }
      },
      
    });
    conversation.users.map(user => delete user.password)
    const conv = conversation.users.filter(user => user.id === userId)
    if (!conv) throw new UnauthorizedException();
    conversation.messages?.reverse()
    return conversation;
  }
  async getContacts(id: string) {

    const contacts = await this.prisma.user.findUnique({
      where: {
        id : id
      },
      select:{
        chat: {
          include: {
            users: {
              where:{
                NOT: {
                  id:id
                }
              }
            }
          }
        }
      }
    });
    return contacts.chat;
  }
}
