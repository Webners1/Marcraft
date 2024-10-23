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
    link: '/explore',
    img: 'https://t4.ftcdn.net/jpg/05/06/32/25/360_F_506322523_ZGKO5HLmrTVTy9eAZHbEwJb9Zqeaw9q5.jpg',
    btnText: "Explore",
    title: 'DeFi',
  },
  {
    link: '/explore',
    img: 'https://t4.ftcdn.net/jpg/04/92/37/43/240_F_492374306_KfNxLB6on75ReRynniZR9kHYq57FichR.jpg',
    btnText: "Explore",
    title: 'GameFi',

  },
  {
    link: '/explore',
    img: 'https://t4.ftcdn.net/jpg/08/68/45/15/240_F_868451579_d0aMxXJLjwJPVZy4X9ljiLB4kw4dz0iX.jpg',
    btnText: "Explore",
    title: 'Web3 Mini-Apps',
  },
  {
    link: '/explore',
    img: 'https://t3.ftcdn.net/jpg/07/57/58/74/240_F_757587409_QTXnZLpD1nynTKc1OtqGirCdnDDaIDog.jpg',
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
