import LayoutAccount from "../components/Layouts/LayoutAccount";
import LayoutDefault from "../components/Layouts/LayoutDefault"

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const routes = [
  // --- Public
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: "/admin333/account/",
    element: <LayoutAccount />,
    children: [
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
  // --- End public
  // --- Private
  // --- End private
]