import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto,signInForm } from 'src/dto';
import { Sign } from 'crypto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    async signUp(@Body() data: userDto) {
        return this.userService.create(data);
    }
    @Post('signin')
    async signIn(@Body() data: signInForm) {
        return this.userService.signIn(data);
    }
}
