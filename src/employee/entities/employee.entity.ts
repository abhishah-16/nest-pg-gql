import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
