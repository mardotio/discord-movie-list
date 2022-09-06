import { ApiFetch } from './ApiFetch';

export interface ReactionResponse {
  id: string;
  reaction: string;
  user: ShortUserResponse;
}

export interface ShortUserResponse {
  id: string;
  displayName: string;
  avatarLink: string | null;
}

export interface MovieResponse {
  name: string;
  id: string;
  addedOn: number;
  user: ShortUserResponse;
  status: {
    displayName: string;
    order: number;
  };
  userReaction: Omit<ReactionResponse, 'user'> | null;
  reactions: ReactionResponse[];
  watchedOn: number | null;
}

// eslint-disable-next-line import/prefer-default-export
export const BotApi = {
  pickMovie: () => ApiFetch.fetch<MovieResponse>('/bot/movies/random', 'GET'),
};
