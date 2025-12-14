import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/DTOs/authentication/SignUp.dto';
import { SignInDto } from 'src/DTOs/authentication/SignIn.dto';
import { BearerToken } from 'src/decorators/bearerToken.decorator';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  signUp(@Body() signUpDto: SignUpDto): Promise<{ jwtToken: string }> {
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

  @Get('current-user')
  @UseGuards(AuthGuard())
  getCurrentUser(@CurrentUser() user: types.UserPayload): types.UserPayload {
    return this.userService.getCurrentUser(user);
  }
}
