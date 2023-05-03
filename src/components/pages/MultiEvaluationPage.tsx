import { Badge, Card, Group, Loader, Select, Text } from "@mantine/core";
import { MantineSelectBoxData } from "../../interfaces";
import { useFetchTopPageDataQuery } from "../../graphql/generated/graphql";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import TargetCard from "../layout/TargetCard";
import styled from "styled-components";
import { useState } from "react";

const MultiEvaluationPage: React.FC = () => {
  const CardList = styled.div`
    display: grid;
    grid-template-columns: 300px 300px 300px;
    gap: 15px;
  `;

  const [termId, setTermId] = useState<string | null>(null);

  const [result] = useFetchTopPageDataQuery({
    variables: {
      termId: Number(termId),
    },
  });

  // ローディング
  if (result.fetching) return <Loader />;

  // エラー
  if (result.error || !result.data) return <p>Error</p>;

  // 正常
  let multiBusinessTermSelectBoxData: MantineSelectBoxData[] = [];
  let currentTermValue: string = "";
  multiBusinessTermSelectBoxData = result.data.multiBusinessTerms.map(
    (multiBusinessTerm) => {
      if (multiBusinessTerm.isCurrentTerm) {
        currentTermValue = multiBusinessTerm.id.toString();
      }
      return {
        value: multiBusinessTerm.id.toString(),
        label: multiBusinessTerm.businessTermName,
      };
    }
  );

  return (
    <div>
      <Select
        label="営業期"
        placeholder="Pick one"
        data={multiBusinessTermSelectBoxData}
        defaultValue={termId ?? currentTermValue}
        style={{ width: 200 }}
        onChange={setTermId}
      />
      <div style={{ marginTop: 15 }}>
        <Link to={"/sample"}>
          <Button>新規登録</Button>
        </Link>
      </div>
      <CardList>
        {result.data.multiEvaluations.map((multi) => (
          <TargetCard
            id={Number(multi.id)}
            targetUserName={multi.targetUser.name}
          ></TargetCard>
        ))}
      </CardList>
    </div>
  );
};

export default MultiEvaluationPage;
