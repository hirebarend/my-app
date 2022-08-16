import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";

function App() {
  return (
    <Routes>
      {/* <Route
        element={<Navigate replace to="/allow-location" />}
        path="/"
      ></Route> */}
      <Route element={<Home />} path="/" />
    </Routes>
  );
}

export default App;
