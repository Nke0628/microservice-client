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
const JsPdfPage = lazy(() => import("../components/pages/jsPdf/JsPdfPage"));

const RouteConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MultiEvaluationPage />} />
        <Route path="/mulit_evaluation" element={<RputeSamplePage />} />
        <Route path="/report_setting" element={<ReportSettingPage />} />
        <Route path="/js_pdf" element={<JsPdfPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RouteConfig;
