import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto,signInForm } from 'src/dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private userService:AuthService) {}

    @Post('signup')
    signUp(@Body() data: userDto) {
        return this.userService.create(data);
    }
    
    @Post('signin')
    signIn(@Body() data: signInForm) {
        return this.userService.signIn(data);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfil(@Req() req:Request) {
        return this.userService.getProfile(req);
    }
}
