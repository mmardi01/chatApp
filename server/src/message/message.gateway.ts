import { Logger, UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';

@WebSocketGateway({
  cors:{
    origin: 'http://localhost:3000'
  }
})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayConnection{
  
  constructor(private messagService:MessageService) {}



  private logger: Logger = new Logger('MessageGateway');
  
  @WebSocketServer() wss: Server;
  
  afterInit(server: Server) {
    this.logger.log('Initialized');
  }
  
  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
    this.messagService.handleDisconnect(client.id)
  }
  
  
  handleConnection(client: Socket, ...args: any[]) {
  this.logger.log(`Client Connected: ${client.id}`);

  }
  @SubscribeMessage('newUser')
  newUser(client: Socket, data: any){
    return this.messagService.newUser(client.id,data.id);
  }
  
  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, {message,receiverId}: {message:Message,receiverId:string}){
    
    return this.messagService.sendMessage(this.wss,message,receiverId);
  }
    @SubscribeMessage('typing')
  handleTyping(client: Socket, receiverId: string){
    
    return this.messagService.handleTyping(this.wss,receiverId);
  }
}

