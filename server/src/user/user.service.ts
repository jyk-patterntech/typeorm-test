// user/user.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PessimisticLockTransactionRequiredError, Repository, IsNull, Timestamp } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
// type User = {
//   id: number;
//   email: string;
//   name: string;
//   aliasName: string;
//   phoneNum: string;
//   affiliation: string;
//   creationAt: Timestamp;
//   deletedBy: null | number;
//   deletedAt: null | Timestamp;
// };

type FormattedUser = {
  email: string;
  name: string;
  aliasName: string;
  phoneNum: string;
};

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.logger.log('UserService has been initialized');
  }

  async findAll(): Promise<CreateUserDto[]> {


    this.logger.log('Executing findAll() in UserService');
    const userList: User[] = await this.userRepository.find({
      where: { deletedAt: IsNull() }, // Soft delete되지 않은 데이터만 조회
    }
    )
    const formattedUserList: CreateUserDto[] = userList.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      aliasName: user.aliasName,
      phoneNum: user.phoneNum,
      affiliation: user.affiliation,
    }));
    return formattedUserList;
  }

  create(createUserDto: CreateUserDto){
    this.logger.log("Executing create(createUserDto) in UserService.\n new user info: \n")
    this.logger.log(createUserDto)
    const new_user = this.userRepository.create(createUserDto);
    return this.userRepository.save(new_user);
  }

  async delete(id: number, deletedById: number = -1): Promise<void> {
    console.log('Executing delete(<user id>) in UserService.')
    const result = await this.userRepository.update(id, {
      deletedAt: new Date(),
      deletedBy: deletedById,
    });

    if (result.affected === 0) {
        throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Executing update(id: ${id}) in UserService.`);
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    return this.userRepository.save(user);
  }

  
}