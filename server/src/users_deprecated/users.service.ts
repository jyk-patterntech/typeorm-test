// server/src/users/users.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.logger.log('UserService has been initialized');
  }

  create(createUserDto: CreateUserDto) {
    // `createUserDto`를 사용하여 새 `User` 인스턴스를 생성
    const user = this.userRepository.create(createUserDto);
    // `User` 엔티티를 데이터베이스에 저장
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    // 모든 사용자를 찾아 반환
    
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    // 하나의 사용자를 ID를 사용하여 찾아 반환
    const user = await this.userRepository.findOneBy({ id: id });

    // return this.userRepository.findOne(id);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 사용자를 찾아 업데이트
    await this.userRepository.update(id, updateUserDto);
    // 업데이트 된 사용자 반환
    return await this.userRepository.findOneBy({ id: id });
    // return this.userRepository.findOne(id);
  }

  remove(id: number) {
    // ID를 사용하여 사용자를 삭제
    return this.userRepository.delete(id);
  }
}
