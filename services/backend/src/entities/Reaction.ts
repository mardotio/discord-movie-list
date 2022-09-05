import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import User from '@entities/User';
import Movie from '@entities/Movie';

@Entity()
@Unique(['user', 'movie'])
export default class Reaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  reaction!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Movie, { onDelete: 'CASCADE' })
  movie!: Movie;
}
