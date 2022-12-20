import { Navigate, Route, Routes } from '@solidjs/router';
import { Component } from 'solid-js';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Movies from './pages/Movies';
import routes from './routes';

const App: Component = () => (
  <Layout>
    <Routes>
      <Route path={routes.login} component={Login} />

      <Route path="/" component={ProtectedRoute}>
        <Route path="/" element={<Navigate href={routes.login} />} />
        <Route path={routes.movies} component={Movies} />
      </Route>
    </Routes>
  </Layout>
);

export default App;
