import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyAppFunction from "./MyApp";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyAppFunction />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
