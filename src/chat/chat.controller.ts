import {
  Controller,
  Req,
  Get,
  Query,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('create')
  createchat(@Req() req: Request, @Query('id') id: string) {
    return this.chatService.createChat(req['user'], id);
  }

  @Post('send')
  sendMessage(
    @Body('message') message: string,
    @Req() req: Request,
    @Query('id') chatId: string,
  ) {
    const senderId = req['user'].sub;
    return this.chatService.sendMessage({
      message,
      senderId,
      chatId,
    });
  }

  @Get('get')
  getConversation(@Req() req: Request, @Query('id') id: string) {
    const userId = req['user'].id;
    return this.chatService.getConversation(userId, id);
  }
}
