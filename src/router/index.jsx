import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../component/Layout/Laoyout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/layout",
    element: <Layout />,
  },
]);
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
