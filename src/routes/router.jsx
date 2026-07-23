import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/rootLayout/RootLayOut";
import Home from "../pages/Home/home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../pages/auth/Log/Login";
import { Component } from "react";
import Register from "../pages/auth/res/Register";
import PrivateRoute from "../Private/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "coverage",
        element: (
          <PrivateRoute>
            <Coverage />
          </PrivateRoute>
        ),
        loader: () => fetch("/coverage.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);
