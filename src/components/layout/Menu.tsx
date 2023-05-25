import React, { useState } from "react";
import styled from "styled-components";
import burger from "../../burger.svg";

const Sidebar = styled.div`
  border-right: 1px solid #091e4224;
  min-height: 100vh;
  background-color: #edf2f7;
`;

const SidebarContent = styled.div<{ isOpen: boolean }>`
  margin-top: 40px;
  position: sticky;
  top: 50px;
  left: 0px;
  padding-top: 10px;
  padding-left: 15px;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  width: ${(props) => (props.isOpen ? "200px" : "50px")};
`;

const Svg = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sidebar>
      <SidebarContent isOpen={isOpen}>
        <Svg alt="Logo" src={burger} onClick={() => setIsOpen(!isOpen)} />
      </SidebarContent>
    </Sidebar>
  );
};

export default Menu;
