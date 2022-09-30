import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string

  @Field()
  description: string
}
