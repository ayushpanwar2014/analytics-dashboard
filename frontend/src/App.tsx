import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />

        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>

          <div className="contentContainer">
            <Outlet />
          </div>
        </div>

        <Footer />
      </div>
    );
  };

  const ProtectedLayout = () => {

    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <Layout />;
  };

  const PublicRoute = () => {

    const { user } = useAuth();

    if (user) {
      return <Navigate to="/" replace />;
    }

    return <Login />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "users/:id",
          element: <User />,
        },
        {
          path: "products/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "/login",
      element: <PublicRoute />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;