import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WhitelistController } from '../controllers';
import configuration from '../common/env';
import('dotenv/config');

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.${ENV}.env`,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [WhitelistController],
  providers: [],
})
export class AppModule { }
