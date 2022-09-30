import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  designation: string

  @Field({ nullable: true })
  city: string

  @Field({ nullable: true })
  mobile: string

  @Field()
  projectId: string
}
