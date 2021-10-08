import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { TokenStrategy } from './strategies/token.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'SuperSecret',
      signOptions: {
        expiresIn: '1w',
      },
    }),
  ],
  providers: [LocalStrategy, TokenStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
