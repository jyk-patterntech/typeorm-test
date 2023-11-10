import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  aliasName: string;

  @IsNotEmpty()
  @IsString()
  phoneNum: string;

  @IsNotEmpty()
  @IsString()
  affiliation: string;
}
