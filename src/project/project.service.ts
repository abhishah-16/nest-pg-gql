import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {

  constructor(@InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
  ) { }

  async create(createProjectInput: CreateProjectInput) {
    const project = this.projectRepo.create(createProjectInput)
    await this.projectRepo.save(project)
    return project
  }

  async findAll() {
    const projects = await this.projectRepo.find({
      relations: ["employees"]
    })
    return projects
  }

  async findOne(id: string) {
    const project = await this.projectRepo.findOne({
      where: {
        id
      }
    })
    if (!project) {
      throw new Error('Project does not found')
    }
    return project
  }

  async update(id: string, updateProjectInput: UpdateProjectInput) {
    const project = await this.projectRepo.findOne({
      where: {
        id
      }
    })
    if (!project) {
      throw new Error('Project does not found')
    }
    return this.projectRepo.save({
      ...project,
      ...updateProjectInput
    })
  }

  async remove(id: string) {
    let proj = this.findOne(id)
    if (proj) {
      let ret = await this.projectRepo.delete(id)
      if (ret.affected === 1) {
        return proj;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`)
  }

  async getEmployees(id: string) {
    const employees = await this.employeeRepo.find({
      where: {
        projectId: id
      }
    })
    return employees
  }
}
