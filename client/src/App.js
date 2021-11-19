import React from "react";
import Home from "./Home";
import About from "./About";
import styled from "styled-components";
import { Link, Routes, Route, useRoutes } from "react-router-dom";

const Container = styled.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;

export const routes = [
  {
    key: "home",
    path: "/",
    element: <Home />,
  },
  {
    key: "about",
    path: "/about/*",
    element: <About />,
  },
];

// export const routes = useRoutes([
//   { path: "/", element: <Home /> },
//   { path: "/about", element: <About /> },
// ]);

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
          <Route {...route} />
        ))}
      </Routes>
    </Container>
  );
}
