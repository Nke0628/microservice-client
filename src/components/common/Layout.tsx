import { Loader } from "@mantine/core";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Container from "./Container";
import Content from "./Content";
import Header from "./Header";
import Menu from "./Menu";

const Layout: React.FC = () => {
  const MenuContentWrapper = styled.div`
    display: flex;
  `;

  return (
    <Container>
      <Header></Header>
      <MenuContentWrapper>
        <Menu></Menu>
        <Content>
          <Suspense fallback={<Loader />}>
            <Outlet></Outlet>
          </Suspense>
        </Content>
      </MenuContentWrapper>
    </Container>
  );
};

export default Layout;
