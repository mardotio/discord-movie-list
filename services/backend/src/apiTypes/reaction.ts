import { ShortUserResponse } from './user';

export interface UpdateMovieReactionRequest {
  reaction: string;
}

export interface ReactionResponse {
  id: string;
  reaction: string;
  user: ShortUserResponse;
}
