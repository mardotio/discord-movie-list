import { ConnectionOptions } from 'typeorm';
import APP_ENVIRONMENT from '@util/environment';
import Movie from '@entities/Movie';
import User from '@entities/User';
import MovieStatus from '@entities/MovieStatus';
import Reaction from '@entities/Reaction';

const config = (): ConnectionOptions => ({
  type: 'postgres',
  host: APP_ENVIRONMENT.POSTGRES_HOST,
  port: Number(APP_ENVIRONMENT.POSTGRES_PORT),
  username: APP_ENVIRONMENT.POSTGRES_USER,
  password: APP_ENVIRONMENT.POSTGRES_PASSWORD,
  database: APP_ENVIRONMENT.POSTGRES_DB,
  entities: [User, Movie, MovieStatus, Reaction],
  synchronize: true,
});

export default config;
