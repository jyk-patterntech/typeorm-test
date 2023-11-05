// users/users.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.logger.log('UserService has been initialized');
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Executing findAll() in UserService');
    return await this.usersRepository.find();
  }
}