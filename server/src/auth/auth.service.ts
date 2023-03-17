import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';

import { UserService } from '..//user/user.service';
import { User, UserDocument } from '..//user/user.schema';
import { AuthDto } from '..//auth/dto/auth.dto';
import { RefreshTokenDto } from '..//auth/dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(authDto: AuthDto) {
    const oldUserByEmail = await this.userService.findByEmail(authDto.email);
    if (oldUserByEmail)
      throw new BadRequestException(
        'user with this email already in the systems',
      );

    const salt = await genSalt(10);

    const newUser = await this.userService.create({
      email: authDto.email,
      password: await hash(authDto.password, salt),
    });

    await newUser.save();

    const tokens = await this.issueTokenPair(String(newUser._id));
    return {
      user: this.returnUserFields(newUser),
      ...tokens,
    };
  }

  async login(authDto: AuthDto) {
    const user = await this.userService.findByEmail(authDto.email);

    if (!user) {
      throw new BadRequestException(
        'user with this email already in the systems',
      );
    }
    const passwordsMatch = await compare(authDto.password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('invalid password');
    }

    const tokens = await this.issueTokenPair(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in');

    const result = await this.jwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('invalid token or expired');

    const user = await this.userService.findById(result._id);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async issueTokenPair(userId: string) {
    const data = {
      _id: userId,
    };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  returnUserFields(user: UserDocument) {
    return {
      _id: user.id,
      email: user.email,
    };
  }
}
