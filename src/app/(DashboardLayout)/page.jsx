"use client"

import React from 'react';
import PageContainer from '@/app/components/container/PageContainer';

// components
import Banner from '@/app/components/landingpage/banner/Banner';
import C2a2 from '@/app/components/landingpage/c2a/C2a2';
import DemoSlider from '@/app/components/landingpage/demo-slider/DemoSlider';
import Footer from '@/app/components/landingpage/footer/Footer';
import LpHeader from '@/app/components/landingpage/header/Header';

export default function Landingpage() {
  return (
    <PageContainer title="Infinder" description="A Marketplace for Web3 Influincers">
      <LpHeader />
      <Banner />
      <DemoSlider />
      <C2a2 />
      <Footer />
    </PageContainer>
  );
};

