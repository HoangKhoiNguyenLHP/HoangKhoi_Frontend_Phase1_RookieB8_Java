import LayoutDefault from "../components/Layouts/LayoutDefault"

import Home from "../pages/Home";

export const routes = [
  // --- Public
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ]
  }
  // --- End public
  // --- Private
  // --- End private
]