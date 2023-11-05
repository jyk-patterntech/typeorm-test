import { Controller, Get, Logger } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { User } from "./user.entity";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){
        this.logger.log('UserController has been initialized');
    }
    private readonly logger = new Logger(UserController.name);

    @Get('')
    findAll(): Promise<User[]> {
        this.logger.log('Handling findAll() request in UsersController');
        return this.userService.findAll();
        
    }
}