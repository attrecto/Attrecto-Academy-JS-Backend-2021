import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { compare } from 'bcrypt';

import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const userPassword = await this.userService.findPasswordByEmail(email);

    if (!userPassword) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await compare(password, userPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
