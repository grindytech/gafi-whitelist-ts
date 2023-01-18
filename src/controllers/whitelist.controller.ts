import { Controller, Get } from '@nestjs/common';
import { WhitelistService } from '../services';

@Controller()
export class AppController {
  constructor(private readonly appService: WhitelistService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
