import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyAppFunction from "./MyApp";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyAppFunction />,
  },
  {
    path: "/components/Home",
    element: <Home />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
