'use client';
// import Grid from '@mui/material/Grid'
import PageContainer from '@/app/components/container/PageContainer';

import ProfileBanner from '@/app/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from '@/app/components/apps/userprofile/profile/IntroCard';
import PhotosCard from '@/app/components/apps/userprofile/profile/PhotosCard';
import Post from '@/app/components/apps/userprofile/profile/Post';
import ChildCard from '@/app/components/shared/ChildCard';
import {
  Avatar,
  Typography,
  Chip,
  Grid
} from '@mui/material';
import {
  IconCheck,
  IconChecks,
  IconMoodHappy
} from '@tabler/icons-react';
import InlineItemCard from "@/app/components/shared/InlineItemCard";

const UserProfile = () => {
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
          {/* <Post /> */}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
