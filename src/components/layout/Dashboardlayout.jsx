import React from "react";
import Header from "../static/Header";
import SideBar from "../static/SideBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Dashboardlayout = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "red",
        justifyContent: "flex-end",
      }}
    >
      {/* <div
        style={{ position: "fixed", left: "0px", top: "0px", width: "300px" }}
      > */}
      <SideBar />
      {/* </div> */}
      <OutletHolder
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "fixed",
            width: "100%",
            top: "0",
            right: "0",
            zIndex: "10",
          }}
        >
          <Header />
        </div>
        <div style={{ width: "100%", marginTop: "80px" }}>
          <Outlet />
        </div>
      </OutletHolder>
    </div>
  );
};

export default Dashboardlayout;

const OutletHolder = styled.div`
  width: calc(100% - 18%);
`;
