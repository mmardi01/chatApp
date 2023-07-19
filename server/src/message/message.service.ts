import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Message } from '@prisma/client';
import { Socket,Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {

    }
    async newUser(socketId: string,userId: string) {
        try{

            const socket = await this.prisma.socketId.create({
                data:{
                    id:socketId,
                    user:{
                        connect:{
                            id:userId
                        }
                    }
                },
                select:{
                    user:true
                }
            })
            return socket;
        }
        catch (e){
            
        }
    }
    async sendMessage(ws:Server,message:Message,receiverId: string) {
        try{
            const user = await this.prisma.user.findUnique({
                where:{
                    id:receiverId,
                },
                select: {
                    userName:true,
                    socketId: true
                }
            })
            user.socketId.map(sock => {
                ws.to(sock.id).emit('receiveMessage',message)
            });
            return 'message sent'
        }
        catch(e){
            console.log(e)
        }
    }
       async handleTyping(ws:Server, receiverId: string) {
        try{
            const user = await this.prisma.user.findUnique({
                where:{
                    id:receiverId,
                },
                select: {
                    userName:true,
                    socketId: true
                }
            })
            user.socketId.map(sock => {
                ws.to(sock.id).emit('typing')
            });
            return 'message sent'
        }
        catch(e){
            console.log(e)
        }
    }
    async handleDisconnect(socketId: string) {
        try{
            
            const socket =  await this.prisma.socketId.delete({
                where: {
                    id:socketId
                }
            })
        }
        catch{
            
        }
    }

}
