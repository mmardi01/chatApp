import { Body, Controller, Post,Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto, signInForm } from 'src/dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: userDto,@Res({passthrough:true}) res:Response) {
    return this.authService.create(data,res);
  }

  @Post('signin')
  signIn(@Body() data: signInForm, @Res({passthrough:true}) res:Response) {
    return this.authService.signIn(data,res);
  }
}
