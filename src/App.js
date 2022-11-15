import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage";
import AddPage from "./Pages/AddPage";
import EditPage from "./Pages/EditPage";
import DetailPage from "./Pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/AddPage"} element={<AddPage />} />
        <Route path={"/EditPage/:id"} element={<EditPage />} />
        <Route path={"/DetailPage/:id"} element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
