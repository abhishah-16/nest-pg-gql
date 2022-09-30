import { CreateEmployeeInput } from './create-employee.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {

  @Field()
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  designation: string

  @Field({ nullable: true })
  city: string

  @Field({ nullable: true })
  mobile: string

  @Field({ nullable: true })
  projectId: string
}
