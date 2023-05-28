import { Card } from "@mantine/core";
import React from "react";
import styled from "styled-components";

type Props = {
  id: number;
  name: string;
};

const CardContentWrapper = styled.div`
  display: flex;
`;

const IconCircle = styled.figure`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin: 0;
  margin-right: 30px;
`;

const Icon = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

const TargetUserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const TargetUserInfoDetail = styled.div`
  padding: 0;
  font-size: 0.8rem;
`;

const TargetUserInfo = styled.div``;

const TargetCard: React.FC<Props> = ({ name }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <CardContentWrapper>
        <IconCircle>
          <Icon src={`${process.env.PUBLIC_URL}/face.jpg`} />
        </IconCircle>
        <TargetUserInfo>
          <TargetUserName>{name}</TargetUserName>
          <TargetUserInfoDetail>CSD事業部</TargetUserInfoDetail>
          <TargetUserInfoDetail>BS</TargetUserInfoDetail>
          <TargetUserInfoDetail>技術リーダー</TargetUserInfoDetail>
        </TargetUserInfo>
      </CardContentWrapper>
    </Card>
  );
};

export default TargetCard;
