import React from "react";
import styled from "styled-components";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBuilding } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <Container>
      <LogoSection>
        <Logo>Eventiq</Logo>
        <SubLogo>Admin Dashboard</SubLogo>
      </LogoSection>

      <MenuList>
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
          end
        >
          <div className="icon">
            <LuLayoutDashboard />
          </div>
          Overview
        </NavLink>

        <NavLink
          to="/admin-dashboard/venues"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <div className="icon">
            <BsBuilding />
          </div>
          Venues
        </NavLink>
      </MenuList>
    </Container>
  );
};

export default AdminSideBar;

const Container = styled.div`
  width: 22%;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  z-index: 999;
`;

const LogoSection = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #f3f4f6;
  height: 50px;
  margin-right: 90px;
`;

const Logo = styled.h1`
  font-family: "Brush Script MT", cursive;
  font-size: 32px;
  color: #603379;
  margin: 0;
  font-weight: 400;
  font-style: italic;
`;

const SubLogo = styled.div`
  width: 100px;
  color: gray;
  font-size: 10px;
  font-weight: 200;
`;

const MenuList = styled.nav`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  .menu-item {
    width: 90%;
    height: 50px;
    background: #f3f4f6;
    margin-top: 20px;
    color: #603379;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    text-decoration: none;
    font-weight: 500;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 0.2s ease;
  }

  .menu-item.active {
    background: #603379;
    color: white;
  }

  .icon {
    margin-right: 10px;
    font-size: 18px;
  }
`;
