'use client';
// import Grid from '@mui/material/Grid'
import PageContainer from '@/app/components/container/PageContainer';

import ProfileBanner from '@/app/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from '@/app/components/apps/userprofile/profile/IntroCard';
import PhotosCard from '@/app/components/apps/userprofile/profile/PhotosCard';
import Post from '@/app/components/apps/userprofile/profile/Post';
import ChildCard from '@/app/components/shared/ChildCard';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';

import {
  Avatar,
  Typography,
  Chip,
  Grid,
  Box
} from '@mui/material';
import {
  IconCheck,
  IconChecks,
  IconMoodHappy
} from '@tabler/icons-react';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

const UserProfile = () => {

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;

  const optionscolumnchart = {
    chart: {
      id: 'column-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    colors: [primary, secondary, error],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '20%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: ``,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `${val}`;
        },
      },
      theme: 'dark',
    },
    grid: {
      show: false,
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
  };
  const seriescolumnchart = [
    {
      name: 'Likes',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Comments',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Retweets',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];

  const optionspiechart = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    labels: ['Images', 'Text'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
        
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    colors: [primary, secondary],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriespiechart = [45, 55];


  return (
    <PageContainer title="Profile" description="this is Profile">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>

        {/* intro and Photos Card */}
        <Grid item sm={12} lg={4} xs={12}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <ChildCard>
                <Typography fontWeight={600} variant="h4" mb={2}>
                  Influincer Type Tags
                </Typography>
                <InlineItemCard>
                  <Chip variant="outlined" avatar={<Avatar>M</Avatar>} label="DeFi" color="primary" />
                  {/* <Chip avatar={<Avatar>M</Avatar>} label="Default Deletable" onDelete={handleDelete} /> */}
                  <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={"/images/profile/user-4.jpg"} />} label="GameFi" color="secondary" />
                  {/* <Chip avatar={<Avatar alt="Natacha" src={"/images/profile/user-4.jpg"} />} label="Primary Deletable" color="primary" onDelete={handleDelete} /> */}
                  <Chip variant="outlined" icon={<IconMoodHappy />} label="Mini-Apps" color="success" />
                  {/* <Chip icon={<IconMoodHappy />} label="Secondary Deletable" color="secondary" onDelete={handleDelete} /> */}
                  {/* <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={"/images/profile/user-2.jpg"} />} label="Default Filled" color="success" /> */}
                  {/* <Chip avatar={<Avatar alt="Natacha" src={"/images/profile/user-2.jpg"} />} label="Default Deletable" color="success" onDelete={handleDelete} /> */}
                  <Chip variant="outlined" icon={<IconMoodHappy />} label="Default Filled" color="warning" />
                  {/* <Chip icon={<IconMoodHappy />} label="Default Deletable" color="warning" onDelete={handleDelete} /> */}
                  <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={"/images/profile/user-3.jpg"} />} label="Default Filled" color="error" />
                  {/* <Chip avatar={<Avatar alt="Natacha" src={"/images/profile/user-3.jpg"} />} label="Default Deletable" color="error" onDelete={handleDelete} /> */}
                </InlineItemCard>
              </ChildCard>
            </Grid>
            <Grid item sm={12}>
              <IntroCard />
            </Grid>
          </Grid>
        </Grid>
        {/* Posts Card */}
        <Grid item sm={12} lg={8} xs={12}>
          <Box marginBottom={'1rem'}>
            <ChildCard>
              <Typography fontWeight={600} variant="h4" mb={2}>
                Woh walay tags
              </Typography>
              <InlineItemCard>
                <Chip avatar={<Avatar>M</Avatar>} label="DeFi" color="primary" />
                {/* <Chip avatar={<Avatar>M</Avatar>} label="Default Deletable" onDelete={handleDelete} /> */}
                <Chip avatar={<Avatar alt="Natacha" src={"/images/profile/user-4.jpg"} />} label="GameFi" color="secondary" />
                {/* <Chip avatar={<Avatar alt="Natacha" src={"/images/profile/user-4.jpg"} />} label="Primary Deletable" color="primary" onDelete={handleDelete} /> */}
                <Chip icon={<IconMoodHappy />} label="Mini-Apps" color="success" />
                {/* <Chip icon={<IconMoodHappy />} label="Secondary Deletable" color="secondary" onDelete={handleDelete} /> */}
                {/* <Chip variant="outlined" avatar={<Avatar alt="Natacha" src={"/images/profile/user-2.jpg"} />} label="Default Filled" color="success" /> */}
                {/* <Chip avatar={<Avatar alt="Natacha" src={"/images/profile/user-2.jpg"} />} label="Default Deletable" color="success" onDelete={handleDelete} /> */}
                <Chip icon={<IconMoodHappy />} label="Default Filled" color="warning" />
                {/* <Chip icon={<IconMoodHappy />} label="Default Deletable" color="warning" onDelete={handleDelete} /> */}
                <Chip avatar={<Avatar alt="Natacha" src={"/images/profile/user-3.jpg"} />} label="Default Filled" color="error" />
                {/* <Chip avatar={<Avatar alt="Natacha" src={"/images/profile/user-3.jpg"} />} label="Default Deletable" color="error" onDelete={handleDelete} /> */}
              </InlineItemCard>
            </ChildCard>
          </Box>
          <Box marginBottom={'1rem'}>
            <Typography fontWeight={600} variant="h2" mb={2}>
              Post Demographics
            </Typography>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>
                Posts Analytics
              </Typography>
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="300px" width={"100%"}
              />
              <Grid item sm={12} lg={6} xs={12}>
                <Typography fontWeight={600} variant="h5" mb={2}>
                  Graphics-Text Ratio
                </Typography>
                <Chart options={optionspiechart} series={seriespiechart} type="pie" height="300px" width={"100%"} />
              </Grid>
            </ChildCard>
          </Box>
        </Grid>
      </Grid>
    </PageContainer >
  );
};

export default UserProfile;
