import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return req.user;
  }
}
