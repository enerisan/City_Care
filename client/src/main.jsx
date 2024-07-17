import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AjoutIncidentPage from "./pages/AjoutIncidentPage/AjoutIncidentPage";
import BoardPage from "./pages/BoardPage/BoardPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/inscription",
        element: <SignUpPage />,
      },
      {
        path: "/ajout-incident",
        element: <AjoutIncidentPage />,
      },
      {
        path: "board/:id",
        element: <BoardPage />,
      },

      {
        path: "*",
        element: <h1>Page not found</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
