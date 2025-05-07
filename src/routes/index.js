import variables from "../config/variables";

import LayoutAccount from "../components/Layouts/LayoutAccount";
import LayoutAdmin from "../components/Layouts/LayoutAdmin";
import LayoutDefault from "../components/Layouts/LayoutDefault"
import PrivateRoutes from "../components/PrivateRoutes";
import Category from "../pages/Category";
import Dashboard from "../pages/Dashboard";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
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
    path: `/${variables.pathAdmin}/account/`,
    element: <LayoutAccount />,
    children: [
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <Logout />
      }
    ]
  },
  // --- End public
  // --- Private
  {
    path: `/${variables.pathAdmin}/`,
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "categories",
            element: <Category />
          }
        ]
      }
    ]
  }
  // {
  //   path: "/admin333/",
  //   element: <LayoutAdmin />,
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <Dashboard />
  //     },
  //     {
  //       path: "categories",
  //       element: <Category />
  //     }
  //   ]
  // }
  // --- End private
]