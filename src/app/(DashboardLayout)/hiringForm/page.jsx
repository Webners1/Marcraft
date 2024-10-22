import React from 'react';
import PageContainer from "@/app/components/container/PageContainer";
import HiringDetails from "../components/hiringDetails";
import LpHeader from "@/app/components/landingpage/header/Header";
import Footer from "@/app/components/landingpage/footer/Footer";

function HiringFormPage() {

  return (
    <PageContainer title="Marcraft" description="A Marketplace for Web3 Influincers">
      <LpHeader />
      <HiringDetails />
      <Footer />
    </PageContainer>

  );
};

export default HiringFormPage;
