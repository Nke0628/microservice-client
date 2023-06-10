import { Button, Switch, Table, TextInput } from "@mantine/core";
import { type } from "os";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useFetchReportSettingQuery } from "../../../graphql/generated/graphql";

const ReportSettingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const targetTermId = searchParams.getAll("term_id");
  const [result] = useFetchReportSettingQuery({
    variables: {
      termId: Number(targetTermId),
    },
  });

  // 管理すべき項目
  type reportSettingDetail = {
    inputFlg: boolean;
    positionLayerType: number;
    positionLayerName: string;
    theme: string;
    charaNum: string;
  };

  type reportSettingDetails = reportSettingDetail[];

  const getState = () => {
    return result.data!.reportSetting.reportSettingDetails.map(
      (reportSettingDetail) => {
        return {
          inputFlg: reportSettingDetail.inputFlg,
          positionLayerType: reportSettingDetail.positionLayerType,
          positionLayerName: reportSettingDetail.positionLayerName,
          theme: reportSettingDetail.theme,
          charaNum: String(reportSettingDetail.charaNum ?? ""),
        };
      }
    );
  };

  const [list, setList] = useState<reportSettingDetails>(getState());

  const inputUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    console.log(event.target.value);
    setList(
      // mapで更新対象オブジェクトのみを変更した新規配列を作成し、stateにセットする
      list.map((val, index) =>
        index === i
          ? { ...val, [event.target.name]: event.target.value }
          : { ...val }
      )
    );
  };

  const inputCheckUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    console.log(event.target.value);
    setList(
      // mapで更新対象オブジェクトのみを変更した新規配列を作成し、stateにセットする
      list.map((val, index) =>
        index === i
          ? { ...val, [event.target.name]: event.target.checked }
          : { ...val }
      )
    );
  };

  return (
    <div>
      {/* TODO 評価期間名称取得 */}
      <div style={{ fontWeight: "bold" }}>23年上期</div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>役職層</th>
              <th>レポート有無</th>
              <th>テーマ</th>
              <th>文字数</th>
            </tr>
          </thead>
          <tbody>
            {list.map((reportSettingDetail, i) => (
              <tr key={reportSettingDetail.positionLayerType}>
                <td>{reportSettingDetail.positionLayerName}</td>
                <td>
                  <Switch
                    color="cyan"
                    name="inputFlg"
                    checked={reportSettingDetail.inputFlg}
                    onChange={(e) => inputCheckUpdate(e, i)}
                  />
                </td>
                <td>
                  <TextInput
                    name="theme"
                    value={reportSettingDetail.theme}
                    onChange={(e) => inputUpdate(e, i)}
                  ></TextInput>
                </td>
                <td>
                  <TextInput
                    name="charaNum"
                    value={reportSettingDetail.charaNum}
                    onChange={(e) => inputUpdate(e, i)}
                  ></TextInput>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <p>
            最終更新：
            {result.data!.reportSetting.savedAt}（
            {result.data!.reportSetting.saveUser.name}）
          </p>
        </div>
        <div>
          <Button>保存</Button>
        </div>
      </div>
    </div>
  );
};

export default ReportSettingPage;
