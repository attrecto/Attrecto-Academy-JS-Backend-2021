import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  NotFoundException,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';

import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Id } from '../common/id.decorator';
import { TokenGuard } from '../auth/guards/token.guard';
import { Role } from '../common/role-enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { UserEntity } from '../database/entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  async getProfile(@Req() request: Request) {
    const user = request.user as UserEntity;
    return this.usersService.findOne(user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  async findOne(@Id() id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  async update(@Id() id: number, @Body() data: UpdateUserDto) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  async remove(@Id() id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersService.remove(id);
  }
}
