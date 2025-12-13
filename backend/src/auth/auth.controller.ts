import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/DTOs/authentication/SignUp.dto';
import { SignInDto } from 'src/DTOs/authentication/SignIn.dto';
import { BearerToken } from 'src/decorators/bearerToken.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.userService.signUp(signUpDto);
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.userService.signIn(signInDto);
  }

  @Post('google-auth')
  @UsePipes(new ValidationPipe())
  googleAuth(@BearerToken() token: string): Promise<{ jwtToken: string }> {
    return this.userService.googleAuth(token);
  }
}
