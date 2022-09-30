import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {

  constructor(@InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>) { }



  async create(createProjectInput: CreateProjectInput) {
    const project = this.projectRepo.create(createProjectInput)
    await this.projectRepo.save(project)
    return project
  }

  async findAll() {
    const projects = await this.projectRepo.find()
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

  update(id: string, updateProjectInput: UpdateProjectInput) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
