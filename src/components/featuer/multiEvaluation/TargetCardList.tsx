import styled from "styled-components";
import { FetchMultiEvaluationsQuery } from "../../../graphql/generated/graphql";
import TargetCard from "./TargetCard";

type Props = {
  targetCardDataList: FetchMultiEvaluationsQuery["myEvaluatingMultiEvaluations"];
};

const TargetCardList: React.FC<Props> = ({ targetCardDataList }) => {
  const CardList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    gap: 20px;
  `;

  return (
    <CardList>
      {targetCardDataList.map((targetCardData) => (
        <TargetCard
          key={targetCardData.id}
          id={Number(targetCardData.id)}
          name={targetCardData.targetUser.name}
        ></TargetCard>
      ))}
    </CardList>
  );
};

export default TargetCardList;
