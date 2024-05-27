import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { MenuItem, menuData } from "./models/menuData";

import Layout from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

const mapComponent = (item: MenuItem) => {
  let component: JSX.Element;

  switch (item.title) {
    case "Login":
      component = <Login />;
      break;
    case "Logout":
      component = <Logout />;
      break;
    case "Dashboard":
      component = <Dashboard />;
      break;
    case "Unauthorized":
      component = <Unauthorized />;
      break;
    default:
      component = <Home />;
  }

  component = item.layout ? <Layout>{component}</Layout> : component;

  component = item.role ? (
    <PrivateRoute requiredRole={item.role}>{component}</PrivateRoute>
  ) : (
    component
  );

  return component;
};

const mapMenu = (menuData: MenuItem[]) => {
  return menuData.map((item: MenuItem): RouteObject => {
    return {
      path: item.path,
      element: mapComponent(item),
      children: mapMenu(item.children || []),
    };
  });
};

const routes: RouteObject[] = mapMenu(menuData);


const router = createBrowserRouter(routes);

export default router;
