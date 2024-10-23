'use client';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box, Grid, Button } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';

const RevenueUpdates = ({ isLoading, totalEarnings, earningsThisMonth, expensesThisMonth }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography> // Replace with your skeleton if needed
      ) : (
        <DashboardCard title="Revenue Updates" subtitle="Overview of Profit">
          <Grid container spacing={3}>
            {/* Total Earnings */}
            <Grid item xs={12} sm={4}>
              <Stack spacing={3} mt={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    width={40}
                    height={40}
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography color="primary" variant="h6">
                      $
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="700">
                      {totalEarnings}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Earnings
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>

            {/* Earnings this month */}
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ width: 9, mt: 1, height: 9, bgcolor: primary }} />
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    Earnings this month
                  </Typography>
                  <Typography variant="h5">{earningsThisMonth}</Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Expenses this month */}
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ width: 9, mt: 1, height: 9, bgcolor: secondary }} />
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    Expenses this month
                  </Typography>
                  <Typography variant="h5">{expensesThisMonth}</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </DashboardCard>
      )}
    </>
  );
};

export default RevenueUpdates;
