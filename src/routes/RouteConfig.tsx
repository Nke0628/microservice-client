import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/common/Layout";

const MultiEvaluationPage = lazy(
  () => import("../components/pages/multiEvaluation/MultiEvaluationPage")
);
const RputeSamplePage = lazy(
  () =>
    import("../components/pages/submitMultiEvaluation/SumitMultiEvaluationPage")
);
const ReportSettingPage = lazy(
  () => import("../components/pages/reportSetting/ReportSettingPage")
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
