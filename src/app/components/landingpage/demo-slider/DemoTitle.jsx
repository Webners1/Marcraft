import React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AnimationFadeIn from '../animation/Animation';

const DemoTitle = () => {
  return (
    <Grid container spacing={4} justifyContent="center" sx={{ py: 8 }}>
      {/* Main Section */}
      <Grid item xs={12} sm={10} lg={8}>
        <AnimationFadeIn>
          <>
            {/* Main Title */}
            <Typography
              variant="h2"
              fontWeight={700}
              textAlign="center"
              mb={6}
              sx={{
                fontSize: {
                  lg: '40px',
                  xs: '28px',
                },
                lineHeight: {
                  lg: '48px',
                  xs: '32px',
                },
                letterSpacing: '0.5px', // Added for clean look
              }}
            >
              Find the Perfect Influencer for Your Marketing Campaign
            </Typography>

            {/* New Influencer Categories */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
              alignItems="center"
              justifyContent="center"
              mb={4}
              sx={{ textAlign: 'center' }}
            >
              {/* Meme Coin Influencer */}
              <InfluencerBox
                imgSrc="/images/meme-coin.jpg"
                title="Meme Coin Influencer"
                description="Specialists in driving hype for the latest meme tokens and viral trends."
              />

              {/* Financial Trader Influencer */}
              <InfluencerBox
                imgSrc="/images/financial-trader.jpg"
                title="Financial Trader"
                description="Experts in financial markets providing valuable trading insights and strategies."
              />

              {/* Technical Influencer */}
              <InfluencerBox
                imgSrc="/images/technical-influencer.jpg"
                title="Technical Influencer"
                description="Focuses on technical analysis, offering insights into chart patterns and trading setups."
              />
            </Stack>

            {/* Conclusion Section */}
            {/* Enhanced Conclusion Section */}
            <Typography
              variant="h5"
              fontWeight={600}
              textAlign="center"
              sx={{
                fontSize: {
                  lg: '28px',
                  xs: '22px',
                },
                lineHeight: {
                  lg: '36px',
                  xs: '28px',
                },
                color: 'primary.main', // Accent color to make it stand out
                mb: 2, // Margin below
              }}
            >
              A Hassle-Free Experience to Discover
            </Typography>

            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              sx={{
                fontSize: {
                  lg: '24px',
                  xs: '20px',
                },
                lineHeight: {
                  lg: '32px',
                  xs: '28px',
                },
                color: 'text.secondary',
                mb: 4, // Margin bottom for spacing
              }}
            >
              Your Dream Influencer in Just a Few Clicks
            </Typography>
          </>
        </AnimationFadeIn>
      </Grid>
    </Grid>
  );
};

/**
 * Influencer Box Component
 */
const InfluencerBox = ({ imgSrc, title, description }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '320px',
        p: 3,
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Subtle shadow for effect
        bgcolor: 'background.paper', // Background color
        transition: 'transform 0.3s ease', // Smooth hover effect
        '&:hover': {
          transform: 'translateY(-10px)', // Lift on hover
        },
      }}
    >
      <Avatar
        alt={title}
        src={imgSrc}
        sx={{
          width: 80,
          height: 80,
          justifyItems:"center",
          mb: 2,
          borderRadius: '50%',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow effect on image
        }}
      />
      <Typography variant="h6" fontWeight={600} mb={1} sx={{ fontSize: '18px' }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          maxWidth: '280px',
          mx: 'auto',
          fontSize: '15px', // Slightly larger body text
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default DemoTitle;
