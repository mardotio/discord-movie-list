import {
  children,
  Component,
  Context,
  createContext,
  JSX,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { ApiConfig } from 'client';
import createToken from './createToken';
import createUser from './createUser';

ApiConfig.baseEndpoint = '/api';

const createAppStore = () => {
  const [token, tokenActions] = createToken();
  const [user, userActions] = createUser();
  const [state] = createStore({
    get token() {
      return token;
    },
    get user() {
      return user;
    },
  });
  return [state, { ...tokenActions, ...userActions }] as const;
};

const StoreContext = createContext();

export const StoreProvider: Component<{ children: JSX.Element }> = (props) => {
  const store = createAppStore();

  StoreContext.defaultValue = store;

  const c = children(() => props.children);
  return <StoreContext.Provider value={store}>{c()}</StoreContext.Provider>;
};

export const useStore = () =>
  useContext(StoreContext as Context<ReturnType<typeof createAppStore>>);
