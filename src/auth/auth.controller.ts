import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { UserEntity } from '../database/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() request: Request) {
    const user = request.user as UserEntity;

    return this.authService.login(user);
  }
}
