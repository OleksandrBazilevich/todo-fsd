import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (configService: ConfigService) => ({
  secret: configService.get('JWT_SECRET'),
});
