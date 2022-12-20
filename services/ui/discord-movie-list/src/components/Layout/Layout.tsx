import { Component, JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #282c34;
`;

const Layout: Component<{ children: JSX.Element }> = (props) => (
  <Content>{props.children}</Content>
);

export default Layout;
