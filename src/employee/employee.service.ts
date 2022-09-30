import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>) { }

  async create(createEmployeeInput: CreateEmployeeInput) {
    const employee = this.employeeRepo.create(createEmployeeInput)
    await this.employeeRepo.save(employee)
    return employee
  }

  findAll() {
    return this.employeeRepo.find()
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
