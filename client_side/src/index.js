import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './Login/Login';
import ErrorPage from './errorPage/ErrorPage';
import Signup from './Signup/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
