import { ShortUserResponse } from '../user';
import { ReactionResponse } from '../reaction';

export interface CreateMovieRequest {
  name: string;
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

export interface MovieStatusCreateRequest {
  displayName: string;
  order: number;
}

export interface UpdateMovieRequest {
  name?: string;
  statusId?: string;
}
