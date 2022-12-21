import { createEffect, Match, Switch } from 'solid-js';
import { Outlet } from '@solidjs/router';
import { styled } from 'solid-styled-components';
import { useStore } from 'store';
import Logo from 'components/Logo';

const NotAuthorized = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 36px;
  }
`;

const ProtectedRoute = () => {
  const [state, { getUser }] = useStore();

  createEffect(() => {
    if (!state.user.latest) {
      getUser();
    }
  });

  return (
    <Switch>
      <Match when={!state.user.error && state.user()}>
        <Outlet />
      </Match>
      <Match when={state.user.error}>
        <NotAuthorized>
          <Logo size="large" />
          <h1>Not authorized</h1>
        </NotAuthorized>
      </Match>
      <Match when={state.user.loading}>
        <Logo size="large" animate />
      </Match>
    </Switch>
  );
};

export default ProtectedRoute;
