import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchReportSettingQuery } from "../../../graphql/generated/graphql";
import { ReportSetting, ReportSettingDetails } from "./report-setting.type";
import ReportSettingPresenter from "./ReportSettingPresenter";

const ReportSettingContainer: React.FC = () => {
  // 対象の評価期間
  const [searchParams] = useSearchParams();
  const targetTermId = searchParams.getAll("term_id");
  // レポート設定情報取得
  const [result] = useFetchReportSettingQuery({
    variables: {
      termId: Number(targetTermId),
    },
  });
  const reportSetting = result.data!.reportSetting;
  const convertReportSettingDetails = () => {
    return reportSetting.reportSettingDetails.map((reportSettingDetail) => {
      return {
        inputFlg: reportSettingDetail.inputFlg,
        positionLayerType: reportSettingDetail.positionLayerType,
        positionLayerName: reportSettingDetail.positionLayerName,
        theme: reportSettingDetail.theme,
        charaNum: String(reportSettingDetail.charaNum ?? ""),
      };
    });
  };
  const [reportSettingDetails, setReportSettingDetails] =
    useState<ReportSettingDetails>(convertReportSettingDetails());
  const convertReportSetting = (): ReportSetting => {
    return {
      savedAt: reportSetting.savedAt,
      savedBy: reportSetting.saveUser.name,
      reportSettingDetails,
    };
  };

  const handleUpdateTextForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setReportSettingDetails(
      // mapで更新対象オブジェクトのみを変更した新規配列を作成し、stateにセットする
      reportSettingDetails.map((val, index) =>
        index === i
          ? { ...val, [event.target.name]: event.target.value }
          : { ...val }
      )
    );
  };

  const handleUpdateCheckForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setReportSettingDetails(
      // mapで更新対象オブジェクトのみを変更した新規配列を作成し、stateにセットする
      reportSettingDetails.map((val, index) =>
        index === i
          ? { ...val, [event.target.name]: event.target.checked }
          : { ...val }
      )
    );
  };

  return (
    <ReportSettingPresenter
      reportSetting={convertReportSetting()}
      handleCheckUpdate={handleUpdateCheckForm}
      handleTextUpdate={handleUpdateTextForm}
    ></ReportSettingPresenter>
  );
};

export default ReportSettingContainer;
