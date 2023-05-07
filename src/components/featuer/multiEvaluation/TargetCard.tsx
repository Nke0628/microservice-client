import { Card } from "@mantine/core";
import React from "react";
import styled from "styled-components";

type Props = {
  id: number;
  name: string;
};

const TargetCard: React.FC<Props> = ({ name }) => {
  const TargetUserName = styled.div`
    font-size: 1rem;
    font-weight: bold;
  `;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <TargetUserName>{name}</TargetUserName>
    </Card>
  );
};

export default TargetCard;
