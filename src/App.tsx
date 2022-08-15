import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { AllowLocation } from "./pages";

function App() {
  return (
    <Routes>
      <Route
        element={<Navigate replace to="/allow-location" />}
        path="/"
      ></Route>
      <Route element={<AllowLocation />} path="/allow-location" />
    </Routes>
  );
}

export default App;
