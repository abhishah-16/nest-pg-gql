import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(Project) private projectRepo: Repository<Project>) { }

  async create(createEmployeeInput: CreateEmployeeInput) {
    const employee = this.employeeRepo.create(createEmployeeInput)
    await this.employeeRepo.save(employee)
    return employee
  }

  async findAll() {
    const employees = await this.employeeRepo.find({
      relations: ["project"]
    })
    return employees
  }

  async findOne(id: string) {
    const employee = await this.employeeRepo.findOne({
      where: {
        id: id
      }
    })
    if (!employee) {
      throw new Error('Employee Does not Exists')
    }
    return employee
  }
}
