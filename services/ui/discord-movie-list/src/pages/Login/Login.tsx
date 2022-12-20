import { useNavigate, useSearchParams } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { styled } from 'solid-styled-components';
import Logo from '../../components/Logo';
import routes from '../../routes';
import { useStore } from '../../store';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #282c34;
`;

export const TOKEN_QUERY_PARAM = 'token';

const Login = () => {
  const [state, { getToken, getUser }] = useStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  createEffect(() => {
    if (!params[TOKEN_QUERY_PARAM]) {
      return;
    }

    getToken(params[TOKEN_QUERY_PARAM]);
  });

  createEffect(() => {
    if (!state.token()) {
      return;
    }

    getUser();
  });

  createEffect(() => {
    if (!state.user()) {
      return;
    }

    navigate(routes.movies, { replace: true });
  });

  return (
    <div>
      <Header>
        <Logo
          size="large"
          animate={state.token.loading || state.user.loading}
        />
      </Header>
    </div>
  );
};

export default Login;
