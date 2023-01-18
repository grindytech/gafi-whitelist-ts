import { IWhitelist } from '../services';
import { WhitelistService } from '../services';
import {Body, Controller, Get, Post, Query  } from '@nestjs/common';
import('dotenv/config');

export interface IVerify {
  pood_id: string;
  address: string;
};

@Controller('whitelist')
export class WhitelistController {
  whitelistService: WhitelistService

  constructor() {
    this.whitelistService = new WhitelistService(process.env.WHITELIST_PATH);
  }

  @Get()
  async get(@Query('pool_id') pool_id: string): Promise<IWhitelist>{
    return await this.whitelistService.get(pool_id);
  }

  @Post('create')
  async create(@Body() whitelist: IWhitelist): Promise<IWhitelist> {
    return await this.whitelistService.create(whitelist);
  }

  @Post('add')
  async add(@Body() whitelist: IWhitelist): Promise<IWhitelist> {
    return await this.whitelistService.add(whitelist);
  }

  @Get('verify')
  async verify(@Query() query: IVerify): Promise<boolean> {
    return await this.whitelistService.verify(query.pood_id, query.address);
  }
}
