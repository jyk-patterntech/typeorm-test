// server/src/users/dto/delete-user.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteUserDto {
  @IsNumber()
  @IsNotEmpty()
  deletedBy: number; // 삭제 요청자의 사용자 ID
}
