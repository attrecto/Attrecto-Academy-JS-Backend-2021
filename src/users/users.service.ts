import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../database/entity/user.entity';
import { DatabaseError } from '../common/database-error';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: UserDto) {
    try {
      const user = await this.usersRepository.save(data);

      return this.findOne(user.id);
    } catch (e) {
      if (e.errno === DatabaseError.CONSTRAINT) {
        throw new BadRequestException('User already exists!');
      }

      throw e;
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, data: UserDto) {
    try {
      data.id = id;

      const user = await this.usersRepository.save(data);

      return this.findOne(user.id);
    } catch (e) {
      if (e.errno === DatabaseError.CONSTRAINT) {
        throw new BadRequestException('User already exists!');
      }

      throw e;
    }
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
