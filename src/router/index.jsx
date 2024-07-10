import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../component/Layout/Laoyout";
import StackedBarLineChartOne from "../pages/StackedBarLineChartOne";
import StackedBarLineChartTwo from "../pages/StackedBarLineChartTwo";
import StackedLineChart from "../pages/StackedLineChart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/layout",
    element: <Layout />,
  },
  {
    path: "/stacked",
    element: <StackedBarLineChartOne />,
  },
  {
    path: "/stackedone",
    element: <StackedBarLineChartTwo />,
  },
  {
    path: "/stackeLine",
    element: <StackedLineChart />,
  },
]);
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
