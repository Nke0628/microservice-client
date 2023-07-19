export enum ReportSubmitStatus {
  UNANSWERED,
  ACCEPT,
  DECLINE,
}

export type SearchCondition = {
  reportSubmitStatus: ReportSubmitStatus[];
};
