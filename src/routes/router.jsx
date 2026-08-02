import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/rootLayout/RootLayOut";
import Home from "../pages/Home/home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../pages/auth/Log/Login";
import { Component } from "react";
import Register from "../pages/auth/res/Register";
import PrivateRoute from "../Private/PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashbordLayout from "../layout/DashbordLayout/DashbordLayout";
import My_Parcel from "../pages/Dashbords/My_parcel/My_Parcel";
import Payment from "../pages/Dashbords/My_parcel/Payment/Payment";

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
      {
        path: "/sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel />
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
  {
    path: "/dashbord",
    element: (
      <PrivateRoute>
        <DashbordLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcel",
        element: (
          <PrivateRoute>
            <My_Parcel />
          </PrivateRoute>
        ),
      },
      { path: "payment", Component: Payment },
    ],
  },
]);
