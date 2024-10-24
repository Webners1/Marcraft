import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

// Styled Button with main theme colors
const StyledButton = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

// Styled Button with hover effects
const StyledButton2 = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  borderColor: theme.palette.background.paper,
  color: theme.palette.background.paper,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));

// Main Component Function
const C2a2 = () => {
  return (
    <Box>
      <Box
        bgcolor="primary.main"
        sx={{
          pt: '60px',
          pb: '30px',
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item xs={12} sm={12} lg={5}>
              {/* Updated Heading and Description */}
              <Typography variant="h1" color="background.paper" fontWeight={700} mt={4}>
                Connect with Influencers through Data-Driven Insights & Marketplace
              </Typography>

              <Typography
                variant="h6"
                color="background.paper"
                fontWeight={400}
                mt={2}
                sx={{
                  lineHeight: '1.6',
                  fontSize: {
                    lg: '18px',
                    xs: '16px',
                  },
                }}
              >
                Discover top influencers and content creators, powered by data analytics. Our marketplace lets you
                easily find and collaborate with creators that align with your brand and goals.
              </Typography>

              {/* Optional Buttons for Call-to-Action */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={3}>
                <StyledButton variant="contained" color="inherit" href="/explore">
                  Explore Marketplace
                </StyledButton>
                <StyledButton2 variant="outlined" color="inherit" href="/auth/auth1/register">
                  Join as an Influencer
                </StyledButton2>
              </Stack>
            </Grid>

            {/* Image Section */}
            <Grid item xs={12} lg={5}>
              <Box
                sx={{
                  textAlign: {
                    xs: 'center',
                    lg: 'right',
                  },
                }}
              >
                {/* Update the image to reflect influencer, data hub, and marketplace */}
                <Image
    src="https://i.ibb.co/2d77zGh/DI4thi-b-RMWZx-Avkuj2-O1w.jpg"
     alt="Influencer Data Hub"
     width={350}
     height={330}
/>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default C2a2;
