import { Module } from '@nestjs/common';
import { AppController } from '../controllers';
import { WhitelistService } from '../services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [WhitelistService],
})
export class AppModule {}
