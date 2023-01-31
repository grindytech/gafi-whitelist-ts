import { IWhitelist } from '../services';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import('dotenv/config');

@Controller('test')
export class TestController {

  constructor() {}

  @Get('always_true')
  always_true(@Res() res: Response) {
      res.status(HttpStatus.OK).json({result: true});
  }

  @Get('always_false')
  always_false(@Res() res: Response) {
      res.status(HttpStatus.OK).json({result: false});
  }
}
