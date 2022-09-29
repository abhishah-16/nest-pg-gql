import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EmployeeModule,
    GraphQLModule.forRoot({
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nest_typeorm',
      synchronize: true
      
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
