import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

import { User } from './modules/users/entities/user.entity';
import { Profile } from './modules/users/entities/profile.entity';
import { Session } from './modules/users/entities/session.entity';
import { Match } from './modules/game/entities/match.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env.development.local', '.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          ...dbConfig,
          entities: [User, Profile, Session, Match],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
