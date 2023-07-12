import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { GroupController } from './group/group.controller';
import { GroupService } from './group/group.service';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({
      global: true,
      secret: 'wyaaaaaaaaa rabek hada rah gheer secret',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [
    AuthController,
    ChatController,
    UserController,
    GroupController,
  ],
  providers: [
    PrismaService,
    AuthService,
    ChatService,
    UserService,
    GroupService,
  ],
})
export class AppModule {}
