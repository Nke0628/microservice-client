export type MultiBusinessTermData = {
  id: number;
  businessTermName: string;
  isCurrentTerm: boolean;
};

export type MultiBusinessTermDataList = MultiBusinessTermData[];

export interface MantineSelectBoxData {
  value: string;
  label: string;
}
