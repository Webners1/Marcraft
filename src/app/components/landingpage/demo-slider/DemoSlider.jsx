import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import DemoTitle from './DemoTitle';
import Image from 'next/image';


const demos = [
  {
    link: 'https://modernize-nextjs.adminmart.com/dashboards/modern',
    img: '/images/landingpage/demos/demo-main.jpg',
    btnText: "Explore",
    title: 'DeFi',
  },
  {
    link: 'https://modernize-nextjs-dark.vercel.app/dashboards/influencer',
    img: '/images/landingpage/demos/demo-main.jpg',
    btnText: "Explore",
    title: 'GameFi',

  },
  {
    link: 'https://modernize-nextjs-horizontal.vercel.app/dashboards/modern',
    img: '/images/landingpage/demos/demo-main.jpg',
    btnText: "Explore",
    title: 'Web3 Mini-Apps',
  },
  {
    link: '/',
    img: '/images/landingpage/demos/demo-main.jpg',
    btnText: "Confused?",
    title: 'Explore All',
  },
];


const StyledBox = styled(Box)(() => ({
  overflow: 'auto',
  position: 'relative',
  '.MuiButton-root': {
    display: 'none',
  },
  '&:hover': {
    '.MuiButton-root': {
      display: 'block',
      transform: 'translate(-50%,-50%)',
      position: 'absolute',
      left: '50%',
      right: '50%',
      top: '50%',
      minWidth: '100px',
      zIndex: '9',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: ' 0',
      width: '100%',
      height: '100%',
      zIndex: '8',
      backgroundColor: 'rgba(55,114,255,.2)',
    },
  },
}));

const DemoSlider = () => {
  return (
    <Box
      id="demos"
      pb="140px"
      overflow="hidden"
      sx={{
        pt: {
          sm: '60px',
          lg: '0',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <DemoTitle />

        {/* demos */}
        <Box mt={9}>
          <Grid container mt={2} spacing={3}>
            {demos.map((demo, index) => (
              <Grid item xs={12} lg={3} key={index}>
                <Box>
                  <StyledBox>
                    <Image
                      src={demo.img}
                      alt="demo"
                      style={{
                        borderRadius: '8px',
                        width: '100%',
                        height: '100%',
                      }}

                      width={"100"}
                      height={"100"}
                    />
                    <Button 
                      variant="contained"
                      color="primary"
                      // size="medium"
                      href={demo.link}
                      target="_blank"
                    >
                      <Typography style={{display: "flex", justifyContent: "center",alignItems: "center"}}
                        variant="p"
                        color="textPrimary"
                        // textAlign="center"
                        fontWeight={500}
                        margin={0}
                      >
                        {demo.btnText}
                      </Typography>
                    </Button>
                  </StyledBox>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    textAlign="center"
                    fontWeight={500}
                    mt={2}
                  >
                    {demo.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box mb={2} mt={5} textAlign="center">
          <Chip label="Apps" color="primary" />
        </Box> */}

      </Container>
    </Box>
  );
};

export default DemoSlider;
