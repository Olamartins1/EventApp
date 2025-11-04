import React from "react";
import { RouterProvider } from "react-router-dom";
import { Element } from "./router/Router";
import {AuthProvider} from "./assets/AuthContext/AuthContext"
const App = () => {
  return (
    <>
    <AuthProvider>
      <RouterProvider router={Element} />
      </AuthProvider>
    </>
  );
};

export default App;
