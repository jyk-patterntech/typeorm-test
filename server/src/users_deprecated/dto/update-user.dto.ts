// server/src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // 이 DTO는 CreateUserDto의 모든 필드를 optional로 만듭니다.
  // 즉, 수정할 필드만 포함하여 전송할 수 있습니다.
}