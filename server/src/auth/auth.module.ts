import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '..//user/user.module';
import { AuthController } from '..//auth/auth.controller';
import { AuthService } from '..//auth/auth.service';
import { JwtStrategy } from '..//auth/strategies/jwt.stategies';
import { User, UserSchema } from '..//user/user.schema';
import { getJwtConfig } from '..//config/jwt.config';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
