import { createResource, createSignal } from 'solid-js';
import { UsersApi } from '../client';

const createUser = () => {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [user] = createResource(loggedIn, UsersApi.getCurrentUser);

  return [user, { getUser: () => setLoggedIn(true) }] as const;
};

export default createUser;
