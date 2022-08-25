import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, ItemPage, TrackingPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<TrackingPage />} path="/tracking" />
      <Route element={<ItemPage />} path="/:reference" />
    </Routes>
  );
}

export default App;
