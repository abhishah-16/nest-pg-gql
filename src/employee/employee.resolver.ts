import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Project } from 'src/project/entities/project.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) { }

  @Mutation(() => Employee)
  createEmployee(@Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput) {
    return this.employeeService.create(createEmployeeInput);
  }

  @Query(() => [Employee], { name: 'getAllemployee' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.employeeService.findOne(id);
  }

  @ResolveField(() => Project)
  project(@Parent() employeee: Employee) {
    return this.employeeService.getProject(employeee.projectId)
  }
}
