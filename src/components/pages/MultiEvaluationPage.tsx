import { Pagination, Select } from "@mantine/core";
import { SelectData } from "../../interfaces";
import {
  useFetchMultiEvaluationsQuery,
  useFetchMultiTermsQuery,
} from "../../graphql/generated/graphql";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import TargetCardList from "../featuer/multiEvaluation/TargetCardList";
import styled from "styled-components";

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

const MultiEvaluationPage: React.FC = () => {
  const [FetchMultiTermsResult] = useFetchMultiTermsQuery();
  const { multiTerms } = FetchMultiTermsResult.data!;
  const getCurrentMultiTermId = (): string => {
    return multiTerms.find((multiTerm) => multiTerm.isCurrentTerm)!.id;
  };
  const [multiTermId, setMultiTermId] = useState<string | null>(
    getCurrentMultiTermId()
  );

  // 評価取得
  const [result] = useFetchMultiEvaluationsQuery({
    variables: {
      termId: Number(multiTermId),
    },
  });
  const { myEvaluatingMultiEvaluations } = result.data!;

  const getSelectBoxData = (): SelectData[] => {
    return multiTerms.map((multiTerm) => {
      return {
        value: multiTerm.id.toString(),
        label: multiTerm.businessTermName,
      };
    });
  };

  const getMultiTermPeriod = (): string => {
    const targetTerm = multiTermId
      ? multiTerms.find((muliTerm) => muliTerm.id === multiTermId)
      : multiTerms.find((muliTerm) => muliTerm.isCurrentTerm);
    return targetTerm!.multiTermStartDate + "~" + targetTerm!.multiTermEndDate;
  };

  return (
    <>
      <ContentHeader>
        <BusinessTerm>
          <Select
            label="営業期"
            data={getSelectBoxData()}
            defaultValue={multiTermId ?? getCurrentMultiTermId()}
            style={{ width: 200, marginRight: 20, display: "inline-block" }}
            onChange={setMultiTermId}
          />
          {getMultiTermPeriod()}
        </BusinessTerm>
        <Link
          to={{
            pathname: "report_setting",
            search: "?term_id=" + (multiTermId ?? getCurrentMultiTermId()),
          }}
        >
          <Button>設定</Button>
        </Link>
      </ContentHeader>
      <ActionMenu>
        <Link to={"/sample"}>
          <Button>＋新規登録</Button>
        </Link>
      </ActionMenu>
      <TargetCardList
        targetCardDataList={myEvaluatingMultiEvaluations}
      ></TargetCardList>
      <PaginationArea>
        <Pagination total={10} />
      </PaginationArea>
    </>
  );
};

export default MultiEvaluationPage;
