import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { Employee } from 'src/employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Employee]), forwardRef(() => EmployeeModule)],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService]
})
export class ProjectModule { }
