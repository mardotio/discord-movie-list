/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import { Router } from '@solidjs/router';
import App from './App';
import { StoreProvider } from './store';

render(
  () => (
    <StoreProvider>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  ),
  document.getElementById('root') as HTMLElement,
);
