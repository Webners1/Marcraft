import React from 'react';
import PageContainer from "@/app/components/container/PageContainer";
import PricingPage from "../components/pricing";
import LpHeader from "@/app/components/landingpage/header/Header";
import Footer from "@/app/components/landingpage/footer/Footer";

function Pricing() {

  return (
    <PageContainer title="Infinder" description="A Marketplace for Web3 Influincers">
      <LpHeader />
      <PricingPage />
      <Footer />
    </PageContainer>

  );
};

export default Pricing;
