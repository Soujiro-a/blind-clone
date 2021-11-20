import React from "react";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import GNB from "./components/GNB";

const Container = styled.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <GNB />
      </Container>
    </BrowserRouter>
  );
}
