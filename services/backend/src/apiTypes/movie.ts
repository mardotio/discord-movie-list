import { ReactionResponse } from './reaction';
import { StatusResponse } from './status';

export interface CreateMovieRequest {
  name: string;
}

export interface MovieResponse {
  name: string;
  id: string;
  addedOn: number;
  user: {
    avatarLink: string | null;
    displayName: string;
  };
  status: StatusResponse;
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
