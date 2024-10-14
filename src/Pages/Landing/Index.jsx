import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import Copyright from "./Copyright";
import Preloader from "./Preloader";
import Slider from "./Slider";
import Testimonial from "./Testimonial";
import Service from "./Service";
import AdvancedTab from "./AdvancedTab";
import Pricing from "./Pricing";
import BrandArea from "./BrandArea";
import TabArea from "./TabArea";
import Banner from "./Banner";
const Index = () => {
  return (
    <>
      <>
        <main className="page-wrapper">
          <Header />

          {/* <Preloader/> */}

          <Slider />

          <BrandArea />

          <TabArea />

          <AdvancedTab />

        <Banner/>

          <Pricing />

          <Service />

          <Testimonial />

          <Footer />

          <Copyright />
        </main>
      </>
    </>
  );
};

export default Index;
