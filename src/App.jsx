import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/features/AuthSlice";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";

const ProtectedRoute = ({ children, user }) => {
  if (!user) return <Navigate to="/" replace={true} />;
  return children;
};

const NoUserRoute = ({ children, user }) => {
  if (user) return <Navigate to="/welcome" replace={true} />;
  return children;
};

function App() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <NoUserRoute user={user}>
          <Home />,
        </NoUserRoute>
      ),
    },
    {
      path: "/welcome",
      element: (
        <ProtectedRoute user={user}>
          <Welcome />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <NoUserRoute user={user}>
          <Login />
        </NoUserRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <NoUserRoute user={user}>
          <Register />
        </NoUserRoute>
      ),
    },
    {
      path: "/forgot",
      element: (
        <NoUserRoute user={user}>
          <Forgot />
        </NoUserRoute>
      ),
    },
    {
      path: "/order",
      element: (
        <ProtectedRoute user={user}>
          <Order />
        </ProtectedRoute>
      ),
    },
  ]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          className: "body-font font-prompt",
          duration: 3500,
        }}
      />
    </>
  );
}

export default App;
