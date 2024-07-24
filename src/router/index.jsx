import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import BarLineChart from "../pages/BarLineChart";
import LineCoverage from "../pages/LineCoverage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/stackedone",
    element: <BarLineChart />,
  },
  {
    path: "/lineCoverage",
    element: <LineCoverage />,
  },
]);
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
