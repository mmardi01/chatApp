import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAll(@Req() req: Request) {
    return this.userService.getAllUsers(req);
  }
  @Get('profile')
  getProfil(@Req() req: Request) {
    return this.userService.getProfile(req);
  }
}
