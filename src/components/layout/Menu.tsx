import React from "react";
import styled from "styled-components";

const Menu: React.FC = () => {
  const Wrapper = styled.div`
    position: fixed;
    top: 40px;
    bottom: 0;
    width: 150px;
    height: 100%;
    padding-top: 10px;
    padding-left: 15px;
    box-sizing: border-box;
    border-right: 1px solid #091e4224;
    font-size: 15px;
  `;

  return <Wrapper>360度評価</Wrapper>;
};

export default Menu;
