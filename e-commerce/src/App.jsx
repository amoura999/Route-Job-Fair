import React from "react";
import Home from "./components/Home/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound.jsx";
import Products from "./components/Products/Products.jsx";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}
