import React from 'react'
import styled from "styled-components"
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBuilding } from "react-icons/bs";

const AdminSideBar = () => {
  return (
  <>
  <Container>
    <LogoSection>
          <Logo>Eventiq</Logo>
          <SubLogo>Admin Dashboard</SubLogo>
        </LogoSection>
        <MenuList>
            <div className='Overview'>
              <div className='overviewIcon'><LuLayoutDashboard /></div>
              Overview
            </div>
            <div className='Venues'>
              <div className='venuesIcon'><BsBuilding
               /></div>
              Venues
            </div>
          </MenuList>
  </Container>
  </>
  )
}

export default AdminSideBar

const Container = styled.div`
width: 22%;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  align-items:center;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  transition: transform 0.3s ease;
  z-index: 999;
`;

const LogoSection = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #f3f4f6;
  height:50px;
  margin-right:90px;

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

const Logo = styled.h1`
  font-family: "Brush Script MT", cursive;
  font-size: 32px;
  color: purple;
  margin: 0;
  font-weight: 400;
  font-style: italic;
  `;
const SubLogo = styled.div`
width:100px;
color:gray;
font-size:10px;
font-weight:200;
`;

  const MenuList = styled.nav`
  width:90%;
  height:100%;
  // background:blue;
  display:flex;
  flex-direction:column;
  align-items:center;
  

  .Overview{
  width:90%;
  height:50px;
  background:purple;
   margin-top:20px;
   color:#fff;
   border-radius:15px;
   display:flex;
   align-items:center;
   justify-content:center;
   flex-direction:row;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .overviewIcon{
  margin-right:10px;
  }

  .Venues{
  width:90%;
  height:50px;
  background:purple;
   margin-top:20px;
   color:#fff;
   border-radius:15px;
   display:flex;
   align-items:center;
   justify-content:center;
   flex-direction:row;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .venuesIcon{
  margin-right:10px;
  }
  `;