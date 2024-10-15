'use client';
import React from 'react';
import Box from '@mui/material/Box'
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import ProductList from '@/app/components/apps/ecommerce/productGrid/ProductList';
import ProductSidebar from '@/app/components/apps/ecommerce/productGrid/ProductSidebar';
import AppCard from '@/app/components/shared/AppCard';
import FriendsCard from '@/app/components/apps/userprofile/friends/FriendsCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Shop',
  },
];
const Ecommerce = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);

  return (
    <PageContainer title="explore" description="">
      {/* breadcrumb */}
      <Breadcrumb title="Explore" items={BCrumb} />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <ProductSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <FriendsCard />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Ecommerce;
