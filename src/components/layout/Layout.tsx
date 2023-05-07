import { Loader } from "@mantine/core";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Container from "./Container";
import Content from "./Content";
import Header from "./Header";
import Menu from "./Menu";

const Layout: React.FC = () => {
  return (
    <Container>
      <Header></Header>
      <Menu></Menu>
      <Content>
        <Suspense fallback={<Loader />}>
          <Outlet></Outlet>
        </Suspense>
      </Content>
    </Container>
  );
};

export default Layout;
