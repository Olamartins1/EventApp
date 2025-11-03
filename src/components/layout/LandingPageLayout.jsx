import React from "react";
import LandingPageHeader from "../static/LandingPageHeader";
import LandingPageFooter from "../static/LandingPageFooter";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <>
      <LandingPageHeader />
      <Outlet />
      <LandingPageFooter />
    </>
  );
};

export default LandingPageLayout;
