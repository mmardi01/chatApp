import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({
      global:true,
      secret: 'wyaaaaaaaaa rabek hada rah gheer secret',
      signOptions: {expiresIn: '2d'}
    })
  ],
  controllers: [AppController,AuthController],
  providers: [AppService, PrismaService,AuthService],
})
export class AppModule {}
