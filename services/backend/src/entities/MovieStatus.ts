import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Movie from '@entities/Movie';

@Entity()
export default class MovieStatus {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  order!: number;

  @Column({ unique: true })
  displayName!: string;

  @OneToMany(() => Movie, (movie) => movie.status)
  movies!: Movie[];
}
