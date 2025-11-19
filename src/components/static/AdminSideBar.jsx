// import React from "react";
// import styled from "styled-components";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { BsBuilding } from "react-icons/bs";
// import { NavLink } from "react-router-dom";

// const AdminSideBar = () => {
//   return (
//     <Container>
//       <LogoSection>
//         <Logo>Eventiq</Logo>
//         <SubLogo>Admin Dashboard</SubLogo>
//       </LogoSection>

//       <MenuList>
//         <NavLink
//           to="/admin-dashboard"
//           className={({ isActive }) =>
//             isActive ? "menu-item active" : "menu-item"
//           }
//           end
//         >
//           <div className="icon">
//             <LuLayoutDashboard />
//           </div>
//           Overview
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/venues"
//           className={({ isActive }) =>
//             isActive ? "menu-item active" : "menu-item"
//           }
//         >
//           <div className="icon">
//             <BsBuilding />
//           </div>
//           Venues
//         </NavLink>
//       </MenuList>
//     </Container>
//   );
// };

// export default AdminSideBar;

// const Container = styled.div`
//   width: 22%;
//   min-height: 100vh;
//   position: sticky;
//   top: 0;
//   left: 0;
//   background: white;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   border-right: 1px solid #e5e7eb;
//   z-index: 999;
// `;

// const LogoSection = styled.div`
//   padding: 24px 20px;
//   border-bottom: 1px solid #f3f4f6;
//   height: 50px;
//   margin-right: 90px;
// `;

// const Logo = styled.h1`
//   font-family: "Brush Script MT", cursive;
//   font-size: 32px;
//   color: #603379;
//   margin: 0;
//   font-weight: 400;
//   font-style: italic;
// `;

// const SubLogo = styled.div`
//   width: 100px;
//   color: gray;
//   font-size: 10px;
//   font-weight: 200;
// `;

// const MenuList = styled.nav`
//   width: 90%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 30px;

//   .menu-item {
//     width: 90%;
//     height: 50px;
//     background: #f3f4f6;
//     margin-top: 20px;
//     color: #603379;
//     border-radius: 15px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: row;
//     text-decoration: none;
//     font-weight: 500;
//     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//     transition: all 0.2s ease;
//   }

//   .menu-item.active {
//     background: #603379;
//     color: white;
//   }

//   .icon {
//     margin-right: 10px;
//     font-size: 18px;
//   }
// `;

// import React from "react";
// import styled from "styled-components";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { BsBuilding } from "react-icons/bs";
// import { NavLink } from "react-router-dom";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { useState } from "react";
// const AdminSideBar = () => {
//   return (
//     <Container>
//       <LogoSection>
//         <Logo>Eventiq</Logo>

//         <SubLogo>Admin Dashboard</SubLogo>
//       </LogoSection>

//       <MenuList>
//         <NavLink
//           to="/admin-dashboard"
//           className={({ isActive }) =>
//             isActive ? "menu-item active" : "menu-item"
//           }
//           end
//         >
//           <div className="icon">
//             <LuLayoutDashboard />
//           </div>
//           Overview
//         </NavLink>

//         <NavLink
//           to="/admin-dashboard/venues"
//           className={({ isActive }) =>
//             isActive ? "menu-item active" : "menu-item"
//           }
//         >
//           <div className="icon">
//             <BsBuilding />
//           </div>
//           Venues
//         </NavLink>
//       </MenuList>
//     </Container>
//   );
// };

// export default AdminSideBar;

// /* -------------------- STYLES -------------------- */

// const Container = styled.div`
//   width: 22%;
//   min-height: 100vh;
//   position: sticky;
//   top: 0;
//   left: 0;
//   background: white;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   border-right: 1px solid #e5e7eb;
//   z-index: 999;

//   @media (max-width: 480px) {
//     width: 100%;
//     min-height: auto;
//     height: auto;
//     position: relative;
//     border-right: none;
//     border-bottom: 1px solid #e5e7eb;
//   }
// `;

// const LogoSection = styled.div`
//   padding: 24px 20px;
//   border-bottom: 1px solid #f3f4f6;
//   height: 60px;
//   text-align: center;

//   @media (max-width: 768px) {
//     padding: 15px 0;
//     height: auto;
//   }

//   @media (max-width: 480px) {
//     padding: 10px 0;
//     height: auto;
//   }
// `;

// const Logo = styled.h1`
//   font-family: "Brush Script MT", cursive;
//   font-size: 32px;
//   color: #603379;
//   margin: 0;
//   font-weight: 400;
//   font-style: italic;

//   @media (max-width: 768px) {
//     font-size: 26px;
//   }
//   @media (max-width: 480px) {
//     font-size: 22px;
//   }
// `;

// const SubLogo = styled.div`
//   color: gray;
//   font-size: 12px;
//   font-weight: 200;

//   @media (max-width: 768px) {
//     font-size: 10px;
//   }
//   @media (max-width: 480px) {
//     font-size: 9px;
//   }
// `;

// const MenuList = styled.nav`
//   width: 90%;
//   margin-top: 30px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   .menu-item {
//     width: 90%;
//     height: 50px;
//     background: #f3f4f6;
//     margin-top: 20px;
//     color: #603379;
//     border-radius: 15px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: row;
//     text-decoration: none;
//     font-weight: 500;
//     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//     transition: all 0.2s ease;
//   }

//   .menu-item.active {
//     background: #603379;
//     color: white;
//   }

//   .icon {
//     margin-right: 10px;
//     font-size: 18px;
//   }

//   /* Tablet */
//   @media (max-width: 1024px) {
//     .menu-item {
//       width: 100%;
//     }
//   }

//   @media (max-width: 480px) {
//     width: 100%;
//     flex-direction: row;
//     justify-content: space-evenly;
//     align-items: center;
//     margin-top: 10px;
//     padding: 10px 0;
//     gap: 0.5rem;
//   }
//     .menu-item {
//     width: auto;
//     height: auto;
//     padding: 8px 14px;
//     font-size: 12px;
//     margin-top: 0;
//     border-radius: 8px;
//     box-shadow: none;
//   }

//   .icon {
//     margin-right: 5px;
//     font-size: 16px;
//   }
// }

// `;

import React, { useState } from "react";
import styled from "styled-components";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBuilding } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const AdminSideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      {/* TOPBAR ONLY FOR MOBILE */}
      <MobileTopBar>
        <Hamburger onClick={() => setOpen(!open)}>
          {open ? <RxCross2 /> : <RxHamburgerMenu />}
        </Hamburger>
        <Logo>Eventiq</Logo>
      </MobileTopBar>

      <LogoSection>
        <Logo>Eventiq</Logo>
        <SubLogo>Admin Dashboard</SubLogo>
      </LogoSection>

      <MenuList className={open ? "open" : ""}>
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

/* -------------------- STYLES -------------------- */

const Container = styled.div`
  width: 22%;

  min-height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #e5e7eb;
  z-index: 999;

  @media (max-width: 1024px) {
    width: 28%;
  }

  /* Collapse on mobile */
  @media (max-width: 479px) {
    width: 100%;
    width: 60px;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    // overflow: hidden;
  }
`;

const MobileTopBar = styled.div`
  display: none;

  @media (max-width: 479px) {
    width: 50%;
    // padding: 15px 20px;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    gap: 5px;
  }
`;

const Hamburger = styled.div`
  display: none;

  @media (max-width: 479px) {
    display: block;
    font-size: 28px;
    cursor: pointer;
    color: #603379;
    margin-bottom: -70px;
  }
`;

const LogoSection = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #f3f4f6;
  height: 60px;
  text-align: center;

  @media (max-width: 479px) {
    display: none; /* Hide this logo bar on very small screens */
  }
`;

const Logo = styled.h1`
  font-family: "Brush Script MT", cursive;
  font-size: 32px;
  color: #603379;
  margin: 0;
  font-weight: 400;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 479px) {
    font-size: 18px;
    margin-top: 10px;
    margin-left: -40px;
    width: 90px;
  }
`;

const SubLogo = styled.div`
  color: gray;
  font-size: 12px;
  font-weight: 200;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

// const MenuList = styled.nav`
//   width: 90%;
//   margin-top: 30px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   .menu-item {
//     width: 90%;
//     height: 50px;
//     background: #f3f4f6;
//     margin-top: 20px;
//     color: #603379;
//     border-radius: 15px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: row;
//     text-decoration: none;
//     font-weight: 500;
//     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//     transition: all 0.2s ease;
//   }

//   .menu-item.active {
//     background: #603379;
//     color: white;
//   }

//   .icon {
//     margin-right: 10px;
//     font-size: 18px;
//   }

//   /* MOBILE: COLLAPSED BY DEFAULT */
//   @media (max-width: 479px) {
//     display: none;
//     width: 100%;
//     padding-bottom: 15px;

//     &.open {
//       display: flex;
//     }

//     .menu-item {
//       width: 95%;
//       margin-top: 10px;
//     }
//   }
// `;

const MenuList = styled.nav`
  width: 90%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

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

  /* MOBILE: COLLAPSED BY DEFAULT */
  @media (max-width: 479px) {
    display: none;
    width: 100%;
    // width: 400px;
    padding-bottom: 15px;

    &.open {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .menu-item {
      width: 95%;
      margin-top: 10px;
      height: 45px;
      font-size: 9px;
      border-radius: 10px;
    }

    .icon {
      margin-right: 6px;
      font-size: 10px;
    }
  }
`;
