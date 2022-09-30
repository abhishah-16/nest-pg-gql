import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  email: string

  @Field()
  @Column()
  designation: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  mobile: string

  @ManyToOne(() => Project, project => project.employees)
  @Field(() => Project)
  project: Project

  @Field()
  @Column({ nullable: true })
  projectId: string
}
