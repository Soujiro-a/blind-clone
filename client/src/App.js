import React from "react";
import Home from "./Home";
import About from "./About";
import styled from "styled-components";
import { Link, Routes, Route } from "react-router-dom";

const Container = styled.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;

export const routes = [
  {
    key: "home",
    path: "/*",
    component: Home,
  },
  {
    key: "about",
    path: "/about/*",
    component: About,
  },
];

export default function App() {
  return (
    <Container>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Routes>
        {routes.map((route) => (
          <Route key={route.key} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Container>
  );
}
