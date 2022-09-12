import React from 'react';
import styled from 'styled-components';
import Logo from './components/Logo';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #282c34;
`;

const App = () => (
  <div>
    <Header>
      <Logo size="large" animate />
    </Header>
  </div>
);

export default App;
