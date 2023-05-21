import React from "react";
import styled from "styled-components";

const Header: React.FC = () => {
  const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #091e4224;
    background-color: #0284c7;
    z-index: 2;
    padding: 5px 15px;
    font-weight: bold;
  `;

  const Title = styled.a`
    text-decoration: none;
    color: white;
  `;

  return (
    <Wrapper>
      <Title href="/">人財評価システム</Title>
    </Wrapper>
  );
};

export default Header;
