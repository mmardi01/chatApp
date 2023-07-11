import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GroupService } from './group.service';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('create')
  createGroup(@Req() req: Request) {
    const user = req['user'];
    return this.groupService.createGroup(user.sub);
  }
}
