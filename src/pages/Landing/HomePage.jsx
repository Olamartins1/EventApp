import React from "react";
import Hero from "../Landing/Hero";
import FeatureCards from "../Landing/FeatureCards";
import HowItWorks from "../Landing/HowItWorks";
import Halls from "../Landing/Halls";
import AboutUs from "../Landing/AboutUs";
import GrowBookings from "../Landing/GrowBookings";
import EventSection from "../Landing/EventSection";
import FAQ from "../Landing/FAQ";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <Halls />
      <AboutUs />
      <GrowBookings />
      <EventSection />
      <FAQ />
    </>
  );
};

export default HomePage;
