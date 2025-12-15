import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User';
import { SignUpDto } from 'src/DTOs/authentication/SignUp.dto';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { SignInDto } from 'src/DTOs/authentication/SignIn.dto';
import * as admin from 'firebase-admin';
import { UserPayload } from 'src/types';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject('FIREBASE_ADMIN') private firebase: admin.app.App,
  ) {}

  private createCookieWithJwtToken(jwtToken: string, res: Response) {
    res.cookie('auth-session', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  async signUp(
    signUpDto: SignUpDto,
    res: Response,
  ): Promise<{ message: string }> {
    const { firstName, lastName, email, password, confirmPassword } = signUpDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new ConflictException('An account already exists with this email');
    }

    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const jwtToken = this.jwtService.sign({
      id: newUser._id,
    });

    this.createCookieWithJwtToken(jwtToken, res);

    return { message: 'success' };
  }

  async signIn(
    signInDto: SignInDto,
    res: Response,
  ): Promise<{ message: string }> {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const jwtToken = this.jwtService.sign({
      id: user._id,
    });

    this.createCookieWithJwtToken(jwtToken, res);

    return { message: 'success' };
  }

  async googleAuth(token: string, res: Response): Promise<{ message: string }> {
    const payload = await this.firebase.auth().verifyIdToken(token);
    const payloadUID: string = payload.uid;
    const userRecord = await this.firebase.auth().getUser(payloadUID);

    let user = await this.userModel.findOne({ email: userRecord.email });

    if (!user) {
      user = new this.userModel({
        _id: payloadUID,
        firstName: userRecord.displayName?.split(' ')[0] || 'GoogleUser',
        lastName: userRecord.displayName
          ? userRecord.displayName.split(' ').slice(1).join(' ')
          : 'GoogleUser',
        email: userRecord.email,
        password: Math.random().toString(36).slice(-8),
      });
      await user.save();
    }

    const jwtToken = this.jwtService.sign({
      id: user._id,
    });

    this.createCookieWithJwtToken(jwtToken, res);

    return { message: 'success' };
  }

  signOut(res: Response): { message: string } {
    res.clearCookie('auth-session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { message: 'success' };
  }

  getCurrentUser(user: UserPayload): UserPayload {
    return user;
  }
}
