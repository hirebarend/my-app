import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Item, Tracking } from "./pages";

function App() {
  return (
    <Routes>
      {/* <Route
        element={<Navigate replace to="/allow-location" />}
        path="/"
      ></Route> */}
      <Route element={<Home />} path="/" />
      <Route element={<Tracking />} path="/tracking" />
      <Route element={<Item />} path="/:reference" />
    </Routes>
  );
}

export default App;
