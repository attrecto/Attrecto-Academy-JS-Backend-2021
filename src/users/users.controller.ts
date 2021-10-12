import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Id } from '../common/id.decorator';
import { TokenGuard } from 'src/auth/guards/token.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  @UseGuards(TokenGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  async findOne(@Id() id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  async update(@Id() id: number, @Body() data: UpdateUserDto) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  async remove(@Id() id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersService.remove(id);
  }
}
