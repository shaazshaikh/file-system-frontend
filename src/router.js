import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyAppFunction from "./MyApp";
import Home from "./components/Home";
import FileUploadAndFetch from "./components/FileUploadAndFetch";
import { UserProvider } from "./context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyAppFunction />,
  },
  {
    path: "/components/Home",
    // element: <FileUploadAndFetch />,
    element: <Home />,
  },
]);

function AppRouter() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default AppRouter;
