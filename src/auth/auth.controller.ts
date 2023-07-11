import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto, signInForm } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: userDto) {
    return this.authService.create(data);
  }

  @Post('signin')
  signIn(@Body() data: signInForm) {
    return this.authService.signIn(data);
  }
}
