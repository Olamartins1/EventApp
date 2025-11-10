import React from "react";
import { RouterProvider } from "react-router-dom";
import { Element } from "./router/Router";
import {AuthProvider} from "./assets/AuthContext/AuthContext"
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={Element} />
      </AuthProvider>

    
    </>
  );
};

export default App;




