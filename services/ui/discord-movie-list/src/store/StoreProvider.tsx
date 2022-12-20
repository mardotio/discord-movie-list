import { Component, createContext, JSX, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ApiConfig } from '../client';
import createToken from './createToken';
import createUser from './createUser';

const createProvider = () => {
  ApiConfig.baseEndpoint = '/api';
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
  const store = [state, { ...tokenActions, ...userActions }] as const;
  const StoreContext = createContext(store);

  const StoreProvider: Component<{ children: JSX.Element }> = (props) => (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );

  return {
    StoreProvider,
    useStore: () => useContext(StoreContext),
  };
};

export const { StoreProvider, useStore } = createProvider();
