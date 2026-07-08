import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/rootLayout/RootLayOut";
import Home from "../pages/Home/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: Home }],
  },
]);
