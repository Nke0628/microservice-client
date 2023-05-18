import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Content: React.FC<Props> = ({ children }) => {
  const Wrapper = styled.div`
    margin-left: 150px;
    margin-top: 40px;
    margin-bottom: 100px;
    box-sizing: border-box;
    overflow: auto;
    padding: 15px 25px;
    z-index: 1;
    font-size: 15px;
  `;

  return <Wrapper>{children}</Wrapper>;
};

export default Content;
