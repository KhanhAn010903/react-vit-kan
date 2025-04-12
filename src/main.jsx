import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import ProductPage from "./pages/product.jsx";
import ErrorPage from "./pages/error.jsx";
import UserPage from "./pages/user.jsx";
import "./styles/global.css";
import TodoApp from "./components/todo/TodoApp.jsx";
import BookPage from "./pages/book.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement : <ErrorPage/>,
    children: [
      {
         index : true, //Đoạn mã này giúp cho chỉ phần cha mới hiển thị TodoApp
         element : <TodoApp/>
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path : "/books",
        element : <BookPage/>
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
