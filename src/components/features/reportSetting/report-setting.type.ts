export type ReportSetting = {
  savedAt: string;
  savedBy: string;
  reportSettingDetails: ReportSettingDetails;
};

export type ReportSettingDetail = {
  inputFlg: boolean;
  positionLayerType: number;
  positionLayerName: string;
  theme: string;
  charaNum: string;
};

export type ReportSettingDetails = ReportSettingDetail[];
