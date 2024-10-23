'use client';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';
import SkeletonCustomersCard from '../skeleton/CustomersCard';

const Customers = ({ isLoading, totalCustomers }) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

 

  // Dynamic series data for the chart
 
  return (
    <>
      {isLoading ? (
        <SkeletonCustomersCard />
      ) : (
        <DashboardCard
        >
          <>
            <Typography variant="subtitle2" color="textSecondary">
              Customers
            </Typography>
            <Typography variant="h4">{totalCustomers}</Typography>
         
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default Customers;
