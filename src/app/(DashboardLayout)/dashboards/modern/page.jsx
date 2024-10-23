'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing the icon for back button
import { useRouter } from 'next/navigation'; // To navigate back to the main page
import PageContainer from '@/app/components/container/PageContainer';
import RevenueUpdates from '@/app/components/dashboards/modern/RevenueUpdates';
import TopCards from '@/app/components/dashboards/modern/TopCards';
import ProfileBanner from '@/app/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from '@/app/components/apps/userprofile/profile/IntroCard';
import Welcome from '@/app/(DashboardLayout)/layout/shared/welcome/Welcome';
import { fetchUserProfile } from '@/store/apps/userProfile/CurrentProfile';
import ProductPerformances from '@/app/components/dashboards/influencer/ProductPerformances';

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch data from Redux store
  const { profile, loading } = useSelector((state) => state.currentuser);

  useEffect(() => {
    // Dispatch the fetchUserProfile thunk to load the profile data
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Handle loading state for profile and products
  if (loading) {
    return <div>Loading...</div>;
  }

  // Extract data from the profile object in Redux
  const earnings = profile?.totalEarnings || "$0";
  const clients = profile?.clients || "0";
  const projects = profile?.projects || []; // Fetching the projects data from profile object
  const activeProjects = profile?.activeProjects || "0";

  // Handle back navigation
  const handleBackClick = () => {
    router.push('/'); // Navigate back to the main page
  };

  return (
    <PageContainer title="Dashboard" description="This is the Dashboard">
      <Box>
        {/* Back Button */}
        <Box display="flex" justifyContent="flex-start" mb={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
          >
            Back to Main Page
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Profile Banner */}
          <Grid item xs={12}>
            <ProfileBanner
              name={profile?.name}
              job={profile?.job || 'Unknown Job'}
              avatar={profile?.avatar || '/images/default-avatar.png'}
              coverImage={profile?.coverImage || '/images/backgrounds/default-bg.jpg'}
              posts={profile?.posts || 0}
              followers={profile?.followers || 0}
              following={profile?.following || 0}
              isWallet={true}
            />
          </Grid>

          {/* Intro Card */}
          <Grid item xs={12} md={6} lg={4}>
            <IntroCard
              name={profile?.name}
              bio={profile?.bio || 'No bio available'}
              job={profile?.job || 'Unknown job'}
              email={profile?.email}
              website={profile?.website || 'No website'}
              location={profile?.location || 'Unknown location'}
            />
          </Grid>

          {/* Top Cards */}
          <Grid item xs={12} md={6} lg={8}>
            <TopCards
              earnings={earnings}
              clients={clients}
              projects={projects.length} // Display the number of projects
              activeProjects={activeProjects}
            />
          </Grid>

          {/* Revenue Updates */}
          <Grid item xs={12} lg={8}>
            <RevenueUpdates
              isLoading={loading}
              totalEarnings={earnings}
              earningsThisMonth={profile?.earningsThisMonth || "$0"}
              expensesThisMonth={profile?.expensesThisMonth || "$0"}
            />
          </Grid>

          {/* Product Performances (Using Projects data) */}
          <Grid item xs={12}>
            <ProductPerformances products={projects} /> {/* Passing projects as products */}
          </Grid>

          {/* Welcome Section */}
          <Grid item xs={12}>
            <Welcome />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
