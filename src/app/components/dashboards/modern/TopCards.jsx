'use client';
import Image from "next/image";
import { Box, CardContent, Grid, Typography } from "@mui/material";

// Accepting numbers as props
const TopCards = ({ earnings, clients, projects, activeProjects }) => {
  // Data dynamically populated via props
  const topcards = [
    {
      icon: '/images/svgs/icon-speech-bubble.svg', // Replace with relevant icons
      title: "Earnings",
      digits: earnings,
      bgcolor: "success",
    },
    {
      icon: '/images/svgs/icon-briefcase.svg',
      title: "Clients",
      digits: clients,
      bgcolor: "warning",
    },
    {
      icon: '/images/svgs/icon-mailbox.svg',
      title: "Projects",
      digits: projects,
      bgcolor: "secondary",
    },
    {
      icon: '/images/svgs/icon-connect.svg',
      title: "Active Projects",
      digits: activeProjects,
      bgcolor: "primary",
    },
  ];

  return (
    <Grid container spacing={3} mt={1}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={6} lg={3} key={i}>
          <Box bgcolor={topcard.bgcolor + ".light"} textAlign="center">
            <CardContent>
              <Image src={topcard.icon} alt={topcard.title} width="50" height="50" />
              <Typography
                color={topcard.bgcolor + ".main"}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
