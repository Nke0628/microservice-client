import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MultiEvaluationPage from "../components/pages/MultiEvaluationPage";

const RouteConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<MultiEvaluationPage />} />
    </Routes>
  </BrowserRouter>
);

export default RouteConfig;
