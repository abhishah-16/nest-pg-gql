import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { Repository } from 'typeorm';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    private projectservice: ProjectService) { }

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

  async getProject(id: string) {
    const project = await this.projectservice.findOne(id)
    return project
  }

  async remove(id: string) {
    let employee = this.findOne(id)
    if (employee) {
      let ret = await this.employeeRepo.delete(id)
      if (ret.affected === 1) {
        return employee;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`)
  }

  async update(id: string, updateEmployeeInput: UpdateEmployeeInput) {
    const employee = await this.employeeRepo.findOne({
      where: {
        id: id
      }
    })
    if (!employee) {
      throw new Error('Employee Does not Exists')
    }
    return this.projectRepo.save({
      ...employee,
      ...updateEmployeeInput
    })
  }
}
