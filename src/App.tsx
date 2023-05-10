import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MainScreen from "./pages/MainScreen/MainScreen";
import NavigationBar from "./NavigationBar";
import About from "./pages/About/About";
import Details from "./pages/Details/Details";

function App() {
  const AppLayout = () => {
    return (
      <>
        <NavigationBar />
        <Outlet />
      </>
    );
  };

  // Creating Navigation Router
  const router = createBrowserRouter([
    {
      // Main layout of the web app
      element: <AppLayout />,
      children: [
        // Home Page to show report for top 50 Crypto Currency
        {
          path: "/",
          element: <MainScreen />,
        },
        // Page to show details of a single Crypto Currency
        { path: "/details/:id", element: <Details /> },
        // Simple About Page
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
