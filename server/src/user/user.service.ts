import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(req: Request) {
    const data = req['user'];
    const user = await this.prisma.user.findUnique({
      where: {
        userName: data.username,
      },
    });
    delete user.password;
    return user;
  }
  async getAllUsers(req: Request) {
    const users = await this.prisma.user.findMany();
    const currentUser = req['user']
    users.map((user) => delete user.password);
    const res = users.filter((user) => user.id !== currentUser.sub)
    return res;
  }
}
