import { Pagination, Select } from "@mantine/core";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import TargetCardList from "../../features/multiEvaluation/TargetCardList";
import styled from "styled-components";
import { FetchMultiEvaluationsQuery } from "../../../graphql/generated/graphql";
import { ReportSubmitStatus, SearchCondition } from "./type";

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BusinessTerm = styled.div``;

const ActionMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 10px 0;
`;

const PaginationArea = styled.div`
  margin: 30px 0 10px 0;
`;

export type MultiEvaluationPresenterProps = {
  multiTerms: {
    id: string;
    businessTermName: string;
    multiTermStartDate: string;
    multiTermEndDate: string;
    isCurrentTerm: boolean;
  }[];
  multiTermId: string;
  setMultiTermId: (value: string) => void;
  evaluatingEvalations: FetchMultiEvaluationsQuery["myEvaluatingMultiEvaluations"];
  searchCondition: SearchCondition;
  handleChangeReportSubmitStatus: (
    reportSubmitStatus: ReportSubmitStatus
  ) => void;
};

type SelectData = {
  value: string;
  label: string;
};

const MultiEvaluationPresenter: React.FC<MultiEvaluationPresenterProps> = ({
  multiTerms,
  multiTermId,
  setMultiTermId,
  evaluatingEvalations,
  handleChangeReportSubmitStatus,
}) => {
  //　Mantineのセレクトボックス用に変換
  const convertPropsToMultiTermSelectBox = (): SelectData[] => {
    return multiTerms.map((multiTerm) => {
      return {
        value: multiTerm.id.toString(),
        label: multiTerm.businessTermName,
      };
    });
  };

  // 評価期間のラベル生成
  const convertPropsToMultiTermLabel = (): string => {
    const targetTerm = multiTerms.find(
      (muliTerm) => muliTerm.id === multiTermId
    );
    return targetTerm!.multiTermStartDate + "~" + targetTerm!.multiTermEndDate;
  };

  return (
    <>
      <ContentHeader>
        <BusinessTerm>
          <Select
            label="営業期"
            data={convertPropsToMultiTermSelectBox()}
            defaultValue={String(multiTermId)}
            style={{ width: 200, marginRight: 20, display: "inline-block" }}
            onChange={setMultiTermId}
          />
          {convertPropsToMultiTermLabel()}
        </BusinessTerm>
        <Link
          to={{
            pathname: "report_setting",
            search: "?term_id=" + multiTermId,
          }}
        >
          <Button>設定</Button>
        </Link>
      </ContentHeader>
      <div>
        <p>検索条件</p>
        <div>
          <span>レポート提出状況 </span>
          <input
            id="chocolate"
            type="checkbox"
            value="chocolate"
            onChange={() =>
              handleChangeReportSubmitStatus(ReportSubmitStatus.UNANSWERED)
            }
          />
          <label htmlFor="#chocolate" className="form-check-label">
            未回答
          </label>
          <input
            id="cake"
            type="checkbox"
            value="cake"
            onChange={() =>
              handleChangeReportSubmitStatus(ReportSubmitStatus.ACCEPT)
            }
          />
          <label htmlFor="#cake" className="form-check-label">
            承諾
          </label>
          <input
            id="pie"
            type="checkbox"
            value="pie"
            onChange={() =>
              handleChangeReportSubmitStatus(ReportSubmitStatus.DECLINE)
            }
          />
          <label htmlFor="#pie" className="form-check-label">
            辞退
          </label>
        </div>
      </div>
      <ActionMenu>
        <Link to={"/mulit_evaluation"}>
          <Button>＋新規登録</Button>
        </Link>
      </ActionMenu>
      <TargetCardList
        targetCardDataList={evaluatingEvalations}
      ></TargetCardList>
      <PaginationArea>
        <Pagination total={10} />
      </PaginationArea>
    </>
  );
};

export default MultiEvaluationPresenter;
