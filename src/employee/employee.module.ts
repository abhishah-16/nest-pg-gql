import { forwardRef, Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ProjectModule } from 'src/project/project.module';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee,Project]), forwardRef(() => ProjectModule)],
  providers: [EmployeeResolver, EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule { }
