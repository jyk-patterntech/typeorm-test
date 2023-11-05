import { Module, Logger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Module({

    imports: [TypeOrmModule.forFeature([User])],
    controllers:[UserController],
    providers: [UserService]
})
export class UserModule {
    private readonly logger = new Logger(UserModule.name);

    constructor(){
        this.logger.log("UserModule has been initialized.")
    }
}