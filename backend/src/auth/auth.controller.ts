import {
  Body,
  Controller,
  Get,
  Post,
  Res,
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
import express from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ message: string }> {
    return this.userService.signUp(signUpDto, res);
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ message: string }> {
    return this.userService.signIn(signInDto, res);
  }

  @Post('google-auth')
  @UsePipes(new ValidationPipe())
  googleAuth(
    @BearerToken() token: string,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ message: string }> {
    return this.userService.googleAuth(token, res);
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: express.Response): {
    message: string;
  } {
    return this.userService.signOut(res);
  }

  @Get('current-user')
  @UseGuards(AuthGuard())
  getCurrentUser(@CurrentUser() user: types.UserPayload): types.UserPayload {
    return this.userService.getCurrentUser(user);
  }
}
