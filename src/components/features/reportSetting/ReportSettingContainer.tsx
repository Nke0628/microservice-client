import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FetchReportSettingQuery,
  useFetchReportSettingQuery,
  useSaveReportSettingMutation,
} from "../../../graphql/generated/graphql";
import { ReportSetting } from "./report-setting.type";
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

  // 表示用にレポート設定情報の型変換
  const reportSetting = result.data!.reportSetting;
  const convertReportSettingDetails = (
    reportSetting: FetchReportSettingQuery["reportSetting"]
  ) => {
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

  const convertReportSetting = (
    reportSetting: FetchReportSettingQuery["reportSetting"]
  ): ReportSetting => {
    return {
      savedAt: reportSetting.savedAt,
      savedBy: reportSetting.saveUser.name,
      reportSettingDetails: convertReportSettingDetails(reportSetting),
    };
  };

  // 更新用にレポート設定情報をステート管理
  const [reportSettingState, setReportSettingState] = useState<ReportSetting>(
    convertReportSetting(reportSetting)
  );

  const handleUpdateTextForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setReportSettingState({
      ...reportSettingState,
      // mapで更新対象オブジェクトのみを変更した新規配列を作成し、stateにセットする
      reportSettingDetails: reportSettingState.reportSettingDetails.map(
        (val, index) =>
          index === i
            ? { ...val, [event.target.name]: event.target.value }
            : { ...val }
      ),
    });
  };

  const handleUpdateCheckForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setReportSettingState({
      ...reportSettingState,
      // mapで更新対象オブジェクトのみを変更した新規配列を作成し、stateにセットする
      reportSettingDetails: reportSettingState.reportSettingDetails.map(
        (val, index) =>
          index === i
            ? { ...val, [event.target.name]: event.target.checked }
            : { ...val }
      ),
    });
  };

  // レポート保存
  const [, saveReportSetting] = useSaveReportSettingMutation();
  const handleSaveReportSetting = () => {
    saveReportSetting({
      input: {
        termId: Number(targetTermId),
        reportSettingDetail: reportSettingState.reportSettingDetails.map(
          (r) => {
            return {
              inputFlg: r.inputFlg,
              positionLayerType: r.positionLayerType,
              theme: r.theme,
              charaNum: Number(r.charaNum),
            };
          }
        ),
      },
    }).then((result) => {
      if (result.error) {
        alert(result.error?.graphQLErrors[0].extensions.errorDetail);
      } else {
        setReportSettingState(
          convertReportSetting(result.data!.saveReportSetting)
        );
        alert("レポート設定を保存しました");
      }
    });
  };

  return (
    <ReportSettingPresenter
      reportSetting={reportSettingState}
      handleCheckUpdate={handleUpdateCheckForm}
      handleTextUpdate={handleUpdateTextForm}
      handleSaveReportSetting={handleSaveReportSetting}
    ></ReportSettingPresenter>
  );
};

export default ReportSettingContainer;
