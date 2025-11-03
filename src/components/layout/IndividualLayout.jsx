import React from "react";
import { Outlet } from "react-router-dom";
import IndividualHeader from "../static/IndividualHeader";
import IndividualSubHeader from "../static/IndividualSubHeader";

const IndividualLayout = () => {
  return (
    <>
      <IndividualHeader />
      <IndividualSubHeader />
      <Outlet />
    </>
  );
};

export default IndividualLayout;
