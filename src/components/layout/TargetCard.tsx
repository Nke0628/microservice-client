import { Card } from "@mantine/core";
import React from "react";
import styled from "styled-components";

type Props = {
  id: number;
  targetUserName: string;
};

const TargetCard: React.FC<Props> = ({ targetUserName }) => {
  const TargetUserName = styled.div`
    font-size: 1rem;
    font-weight: bold;
  `;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <TargetUserName>{targetUserName}</TargetUserName>
    </Card>
  );
};

export default TargetCard;
