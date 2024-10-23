import axiosInstance from '@/config/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import Cookies from 'js-cookie';

// Define a type for user data
type UserData = {
  name: string | null;
  email?: string | null;
  avatar: string | null;
  type: 'customer' | 'influencer' | null;
  wallet_address?: string | null; // Add wallet address to user data
};

type CounterState = {
  value: number;
  user: UserData | null;
  token: string | null;
};

const initialState: CounterState = {
  value: 0,
  user: null, // Initial user state
  token: null,
};

export const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.wallet_address = action.payload; // Update wallet address
      }
    },
  },
});

export const {
  increment,
  incrementByAmount,
  decrement,
  decrementByAmount,
  reset,
  setUser,
  setToken,
  setWalletAddress, // Export the wallet address action
} = counter.actions;

export default counter.reducer;

// Function to handle Twitter Authentication
export const authenticateWithTwitter =
  (type: 'customer' | 'influencer' = 'customer') =>
  async (dispatch: any) => {
    const auth = getAuth();
    const provider = new TwitterAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = TwitterAuthProvider.credentialFromResult(result);

      if (credential && result.user) {
        // Construct user data to store in Redux
        let userData: UserData = {
          name: result.user.displayName,
          ...(result.user.email ? { email: result.user.email } : {}),
          avatar: result.user.photoURL,
          type,
        };

        const response = await axiosInstance.post('/auth', userData);
        const payload = response?.data?.payload;
        if (payload) {
          dispatch(setUser(payload.user));
          dispatch(setToken(payload.token));
          Cookies.set('user-token', payload.token);
        }
      }
    } catch (error) {
      console.error('Twitter authentication failed', error);
      // Handle error (optional)
    }
  };

export const loginWithAuth = (token: string) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.post(
      '/auth/login-with-auth',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const payload = response?.data?.payload;
    if (payload) {
      dispatch(setUser(payload.user));
      dispatch(setToken(payload.token));
      Cookies.set('user-token', payload.token);
    }
  } catch (error) {
    console.error('Login with auth failed', error);
    // Handle error (optional)
  }
};

export const walletAddressSetter = (address: string, token: string) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.put(
      '/user/wallet-address',
      { wallet_address: address },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const payload = response?.data?.message;
    if (payload) {
      dispatch(setWalletAddress(address));
    }
  } catch (error) {
    console.error('Login with auth failed', error);
    // Handle error (optional)
  }
};
