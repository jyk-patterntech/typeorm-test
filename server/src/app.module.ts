import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // 데이터베이스 타입을 'mysql'로 설정
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '89525252',
      database: 'DUB_RIGHTS',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // 주의: 프로덕션에서는 false로 설정하세요.
    }),
    UserModule,
    // ... 다른 모듈
  ],
  // ...
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(){
      this.logger.log("AppModule has been initialized.")
  }
}