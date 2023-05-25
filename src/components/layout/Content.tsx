import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Content: React.FC<Props> = ({ children }) => {
  const Wrapper = styled.div`
    flex: 1;
    margin-top: 40px;
    margin-bottom: 100px;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 15px 25px;
    z-index: 1;
    font-size: 15px;
  `;

  return <Wrapper>{children}</Wrapper>;
};

export default Content;
