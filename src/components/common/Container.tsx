import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  const Wrapper = styled.div``;

  return <Wrapper>{children}</Wrapper>;
};

export default Container;
