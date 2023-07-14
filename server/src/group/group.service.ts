import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(id: string) {
    try {

      // const group = await this.prisma.group.create();
      // return group;
    }
    catch(e) {
      console.log(e);
    }
  }
}
