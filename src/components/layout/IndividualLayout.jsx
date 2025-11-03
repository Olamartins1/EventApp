import React from "react";
import { Outlet } from "react-router-dom";
import IndividualHeader from "../static/IndividualHeader";
import IndividualSubHeader from "../static/IndividualSubHeader";
import     {AreaProvider} from "../../assets/AreaContext/AreaContext"
const IndividualLayout = () => {
  return (
    <>
    <AreaProvider>

      <IndividualHeader />
      <IndividualSubHeader />
      <Outlet />

          </AreaProvider>

    </>
  );
};

export default IndividualLayout;
