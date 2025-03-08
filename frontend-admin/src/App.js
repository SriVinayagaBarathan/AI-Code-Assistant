import React from "react";
import CodeEditor from "./components/CodeEditor";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1e1e2e;
  color: white;
`;

const Header = styled.header`
  text-align: center;
  padding: 15px;
  background: #111;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 2px solid #333;
`;

const App = () => {
  return (
    <Container>
      <Header>⚡ AI Code Optimizer</Header>
      <CodeEditor />
    </Container>
  );
};

export default App;
