import { Pagination, Select } from "@mantine/core";
import { SelectData } from "../../interfaces";
import { useFetchMultiEvaluationsQuery } from "../../graphql/generated/graphql";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import TargetCardList from "../featuer/multiEvaluation/TargetCardList";
import styled from "styled-components";

const MultiEvaluationPage: React.FC = () => {
  const CreateButtonArea = styled.div`
    margin: 30px 0 10px 0;
  `;

  const PaginationArea = styled.div`
    margin: 30px 0 10px 0;
  `;

  const [multiTermId, setMultiTermId] = useState<string | null>(null);
  const [result] = useFetchMultiEvaluationsQuery({
    variables: {
      termId: Number(multiTermId),
    },
  });
  const { myEvaluatingMultiEvaluations, multiTerms } = result.data!;

  const getSelectBoxData = (): SelectData[] => {
    return multiTerms.map((multiTerm) => {
      return {
        value: multiTerm.id.toString(),
        label: multiTerm.businessTermName,
      };
    });
  };

  const getCurrentMultiTermId = (): string => {
    return multiTerms.find((multiTerm) => multiTerm.isCurrentTerm)!.id;
  };

  const getMultiTermPeriod = (): string => {
    const targetTerm = multiTermId
      ? multiTerms.find((muliTerm) => muliTerm.id === multiTermId)
      : multiTerms.find((muliTerm) => muliTerm.isCurrentTerm);
    return targetTerm!.multiTermStartDate + "~" + targetTerm!.multiTermEndDate;
  };

  return (
    <>
      <div>
        <Select
          label="営業期"
          data={getSelectBoxData()}
          defaultValue={multiTermId ?? getCurrentMultiTermId()}
          style={{ width: 200, marginRight: 20, display: "inline-block" }}
          onChange={setMultiTermId}
        />
        <span>{getMultiTermPeriod()}</span>
      </div>
      <CreateButtonArea>
        <Link to={"/sample"}>
          <Button>＋新規登録</Button>
        </Link>
      </CreateButtonArea>
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
