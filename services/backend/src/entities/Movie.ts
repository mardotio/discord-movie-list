import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '@entities/User';
import MovieStatus from '@entities/MovieStatus';
import Reaction from '@entities/Reaction';

@Entity()
export default class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  addedOn!: Date;

  @Column({ nullable: true, type: 'timestamp without time zone' })
  watchedOn!: Date | null;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => MovieStatus)
  status!: MovieStatus;

  @OneToMany(() => Reaction, (reaction) => reaction.movie)
  reactions!: Reaction[];
}
