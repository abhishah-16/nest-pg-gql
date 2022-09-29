import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field()
  id: string

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
}
