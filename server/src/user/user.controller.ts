// src/user/user.controller.ts
import { Logger, Controller, Get, Post, Put, Body, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "./dto/create-user.dto";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){
        this.logger.log('UserController has been initialized');
    }
    private readonly logger = new Logger(UserController.name);

    @Get('')
    findAll(): Promise<CreateUserDto[]> {
        this.logger.log('Handling findAll() request in UserController');
        return this.userService.findAll();        
    }

    @Post('')
    async create(@Body() createUserDto: CreateUserDto){
        this.logger.log("Handling create(createUserDto) in UserController.\n new user info: \n")
        this.logger.log(createUserDto)
        return await this.userService.create(createUserDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        this.logger.log("Handling delete in UserController.")
        return this.userService.delete(+id)
    }
    
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: CreateUserDto,
    ) {
      this.logger.log(`Handling update(id: ${id}) in UserController.`);
      this.logger.log(updateUserDto)
      return await this.userService.update(id, updateUserDto);
    }
  
}