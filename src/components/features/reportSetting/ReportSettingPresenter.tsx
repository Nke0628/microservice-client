import { Button, Switch, Table, TextInput } from "@mantine/core";
import { ReportSetting } from "./report-setting.type";

export type ReportSettingPresenterProps = {
  reportSetting: ReportSetting;
  handleTextUpdate: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
  handleCheckUpdate: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void;
};

const ReportSettingPresenter: React.FC<ReportSettingPresenterProps> = ({
  reportSetting,
  handleTextUpdate,
  handleCheckUpdate,
}) => {
  return (
    <div>
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
            {reportSetting.reportSettingDetails.map(
              (reportSettingDetail, i) => (
                <tr key={reportSettingDetail.positionLayerType}>
                  <td>{reportSettingDetail.positionLayerName}</td>
                  <td>
                    <Switch
                      color="cyan"
                      name="inputFlg"
                      checked={reportSettingDetail.inputFlg}
                      onChange={(e) => handleCheckUpdate(e, i)}
                    />
                  </td>
                  <td>
                    <TextInput
                      name="theme"
                      value={reportSettingDetail.theme}
                      onChange={(e) => handleTextUpdate(e, i)}
                    ></TextInput>
                  </td>
                  <td>
                    <TextInput
                      name="charaNum"
                      value={reportSettingDetail.charaNum}
                      onChange={(e) => handleTextUpdate(e, i)}
                    ></TextInput>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        <div>
          <p>
            最終更新：
            {reportSetting.savedAt}（{reportSetting.savedBy}）
          </p>
        </div>
        <div>
          <Button>保存</Button>
        </div>
      </div>
    </div>
  );
};

export default ReportSettingPresenter;
