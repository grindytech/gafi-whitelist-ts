import { IWhitelist } from '../services';
import { WhitelistService } from '../services';
import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import('dotenv/config');

export interface IVerify {
  id: string;
  address: string;
};

@Controller('')
export class WhitelistController {
  whitelistService: WhitelistService

  constructor() {
    this.whitelistService = new WhitelistService(process.env.WHITELIST_PATH);
  }

  @Get()
  get(@Query('id') id: string, @Res() res: Response) {
    this.whitelistService.get(id).then(value => {
      res.status(HttpStatus.OK).json(value);
    }).catch(err => {
      res.status(HttpStatus.BAD_REQUEST).send(`Can not get whitelist err: ${err}`);
    })
  }

  @Post('create')
  create(@Body() whitelist: IWhitelist, @Res() res: Response) {
    this.whitelistService.create(whitelist).then(value => {
      res.status(HttpStatus.OK).json(value);
    }).catch(err => {
      res.status(HttpStatus.BAD_REQUEST).send(`Can not create whitelist err: ${err}`);
    })
  }

  @Post('add')
  add(@Body() whitelist: IWhitelist, @Res() res: Response) {
    this.whitelistService.add(whitelist).then(value => {
      res.status(HttpStatus.OK).json(value);
    }).catch(err => {
      res.status(HttpStatus.BAD_REQUEST).send(`Can not add whitelist err: ${err}`);
    })
  }

  @Get('verify')
  verify(@Query() query: IVerify, @Res() res: Response) {
    this.whitelistService.verify(query.id, query.address).then(value => {
      res.status(HttpStatus.OK).json({result: value});
    }).catch(err => {
      res.status(HttpStatus.BAD_REQUEST).send(`Can not verify whitelist err: ${err}`);
    })
  }
}
