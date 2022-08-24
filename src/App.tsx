import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Item } from "./pages";

function App() {
  return (
    <Routes>
      {/* <Route
        element={<Navigate replace to="/allow-location" />}
        path="/"
      ></Route> */}
      <Route element={<Home />} path="/" />
      <Route element={<Item />} path="/:slug" />
    </Routes>
  );
}

export default App;
