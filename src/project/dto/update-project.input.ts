import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput {
  @Field()
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  description: string
}
