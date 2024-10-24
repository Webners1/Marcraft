'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RTL from '@/app/(DashboardLayout)/layout/shared/customizer/RTL';
import { ThemeSettings } from '@/utils/theme/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Cookies from 'js-cookie';
import '@/utils/i18n';
import '@/app/api/index';

// Import FirebaseProvider to wrap the app
import { FirebaseProvider } from './firebase';
import { RainbowKitCustomProvider } from './web3';
import { loginWithAuth } from '@/store/counter/counterSlice';
import { Box, CircularProgress } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const MyApp = ({ children }) => {
  const theme = ThemeSettings();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const customizer = useSelector((state) => state.customizer);
  const { user, token } = useSelector((state) => state.counter);
  const [isLoading, setIsLoading] = useState(true);

  const protectedRoutes = ['/dashboards/modern', '/hiringForm', '/auth/auth1/wallet-address'];
  const authRoutes = ['/auth/auth1/login', '/auth/auth1/register', '/auth/auth1/wallet-address'];

  const authenticate = async () => {
    if (protectedRoutes.includes(pathname) || authRoutes.includes(pathname)) {
      setIsLoading(true);
      try {
        const userToken = Cookies.get('user-token');
        if (userToken) {
          await dispatch(loginWithAuth(userToken));
        }
      } catch (err) {
        if (protectedRoutes.includes(pathname)) router.push('/auth/auth1/register');
      }
    }
    setIsLoading(false);
  };

  const redirects = () => {
    if (protectedRoutes.includes(pathname) || authRoutes.includes(pathname)) {
      if (user) {
        if (!user.wallet_address) {
          router.push('/auth/auth1/wallet-address');
          return;
        }

        if (authRoutes.includes(pathname)) {
          router.push('/explore');
        }
      } else if (protectedRoutes.includes(pathname)) {
        router.push('/auth/auth1/register');
      }
    }
  };

  useEffect(() => {
    if (!token) authenticate();
    if (!isLoading) redirects();
  }, [pathname, user, isLoading]);

  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            <CssBaseline />
            <FirebaseProvider>
              <RainbowKitCustomProvider>
                {isLoading ? <Loading /> : children}
              </RainbowKitCustomProvider>
            </FirebaseProvider>
          </RTL>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
};

export default MyApp;
