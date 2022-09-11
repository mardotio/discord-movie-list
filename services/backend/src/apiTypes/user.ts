export interface UserResponse {
  id: string;
  username: string;
  usernameId: string;
  nickname: string | null;
  avatarLink: string | null;
}

export interface ShortUserResponse {
  id: string;
  displayName: string;
  avatarLink: string | null;
}
