import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { RefreshTokenDto } from 'src/auth/dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async signup(@Body() AuthDto: AuthDto) {
    return this.authService.register(AuthDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() AuthDto: AuthDto) {
    return this.authService.login(AuthDto);
  }
}
