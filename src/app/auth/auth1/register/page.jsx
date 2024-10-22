"use client";
import { useState } from 'react';
import Link from "next/link";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import Image from "next/image";
import { authenticateWithTwitter, setWalletAddress } from "@/store/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const [walletAddress, setWalletAddressInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleTwitterLogin = async () => {
    try {
      // Trigger Twitter login
      await dispatch(authenticateWithTwitter());
      // Assuming login success, move to wallet input
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Twitter authentication failed", error);
    }
  };

  const handleWalletSubmit = () => {
    if (walletAddress) {
      // Dispatch wallet address to the Redux store
      dispatch(setWalletAddress(walletAddress));
      // You can now handle post-wallet logic, like redirecting to a dashboard
      console.log("Wallet Address submitted:", walletAddress);
    } else {
      alert("Please enter a valid wallet address.");
    }
  };

  return (
    <PageContainer title="Register Page" description="This is a sample page">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ overflowX: "hidden" }}
      >
        {/* Left side with background */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={"calc(100vh - 75px)"}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}
            >
              <Image
                src={"/images/backgrounds/login-bg.svg"}
                alt="bg"
                width={500}
                height={500}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  maxHeight: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Right side with Twitter login and wallet input */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4} textAlign="center">
            <Typography variant="h4" gutterBottom>
              Welcome to Marcraft
            </Typography>
            {!isAuthenticated ? (
              <>
                <Typography variant="subtitle1" color="textSecondary" mb={3}>
                  Sign in with Twitter to continue
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTwitterLogin}
                >
                  Sign in with Twitter
                </Button>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" color="textSecondary" mb={3}>
                  Enter your wallet address to complete registration
                </Typography>
                <TextField
                  fullWidth
                  label="Wallet Address"
                  variant="outlined"
                  value={walletAddress}
                  onChange={(e) => setWalletAddressInput(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleWalletSubmit}
                >
                  Submit Wallet Address
                </Button>
              </>
            )}
            <Stack direction="row" spacing={1} mt={3} justifyContent="center">
              <Typography color="textSecondary" variant="h6" fontWeight="400">
                Already have an Account?
              </Typography>
              <Typography
                component={Link}
                href="/auth/auth1/login"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                }}
              >
                Sign In
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
