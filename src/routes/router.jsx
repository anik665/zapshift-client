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
import Payment from "../pages/Dashbords/Payment/Payment";
import PaymentSuccess from "../pages/Dashbords/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashbords/Payment/PaymentCancel";
import AboutUs from "../pages/About/AboutUs";
import BeArider from "../shere/BeArider/BeArider";
import Service from "../pages/service/Service";
import Contact from "../pages/Contact/Contact";
import Pricing from "../pages/Pricing/Pricing";
import PaymentHistory from "../pages/Dashbords/PaymetHistory/PaymentHistory";
import AppropeRiders from "../pages/Dashbords/AppropeRiders/AppropeRiders";
import UserManagement from "../pages/Dashbords/userManagements/UserManagement";
import Forbidden from "../components/Forbidden";
import AdminRoute from "./AdminRoutes";
import AssignRider from "../pages/Dashbords/Assignrider/Assignrider";
import RiderRoute from "./RiderRoutes";
import Mydeliveris from "../pages/Dashbords/mydeliveris/Mydeliveris";
// import UserManagement from " ../pages/Dashbords/userManagements/UserManagement";

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
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <BeArider />
          </PrivateRoute>
        ),
        loader: () => fetch("/coverage.json").then((res) => res.json()),
      },
      { path: "service", Component: Service },
      { path: "contact", Component: Contact },
      { path: "pricing", Component: Pricing },
      { path: "about", Component: AboutUs },
      {
        path: "/forbidden",
        element: <Forbidden />,
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
      { path: "payment-history", Component: PaymentHistory },
      { path: "payment/:ParcelId", Component: Payment },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment-cancel", Component: PaymentCancel },
      { path: "approve-riders", Component: AppropeRiders },
      {
        path: "my-deliveries",
        element: (
          <RiderRoute>
            {" "}
            <Mydeliveris />{" "}
          </RiderRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider />
          </AdminRoute>
        ),
      },
    ],
  },
]);
