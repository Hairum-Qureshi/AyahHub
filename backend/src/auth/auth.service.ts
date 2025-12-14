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

@Injectable()
export class AuthService {
  googleSignUp(token: string): Promise<{ jwtToken: string }> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject('FIREBASE_ADMIN') private firebase: admin.app.App,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
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

    const token = this.jwtService.sign({
      id: newUser._id,
    });

    return { token };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      id: user._id,
    });

    return { token };
  }

  async googleAuth(token: string): Promise<{ jwtToken: string }> {
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

    return { jwtToken };
  }

  getCurrentUser(user: any): any {
    return user;
  }
}
