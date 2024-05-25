import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import router from "./routes";

const App = () => (
  <AuthProvider>
      <RouterProvider router={router}  />
  </AuthProvider>
);

export default App;
