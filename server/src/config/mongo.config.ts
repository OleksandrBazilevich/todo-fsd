import { ConfigService } from '@nestjs/config/dist';

export const getMongoDbConfig = async (configService: ConfigService) => ({
  uri: configService.get('MONGO_URI'),
});
