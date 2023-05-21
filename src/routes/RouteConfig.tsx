import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";

const MultiEvaluationPage = lazy(
  () => import("../components/pages/MultiEvaluationPage")
);
const RputeSamplePage = lazy(
  () => import("../components/pages/SumitMultiEvaluationPage")
);
const ReportSettingPage = lazy(
  () => import("../components/pages/ReportSettingPage")
);

const RouteConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MultiEvaluationPage />} />
        <Route path="/sample" element={<RputeSamplePage />} />
        <Route path="/report_setting" element={<ReportSettingPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RouteConfig;
