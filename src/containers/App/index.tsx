import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "src/components/Home";
import SnackbarProvider from "src/context/SnackbarProvider.context";
import PrivateRoutes from "src/routes/PrivateRoute";
import PublicRoutes from "src/routes/PublicRoute";
import Layout from "../Layout";
import Login from "../Login";
import Room from "../Room";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SnackbarProvider>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route
                path="/home"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/rooms/:id"
                element={
                  <Layout>
                    <Room />
                  </Layout>
                }
              />
            </Route>
          </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
