import axiosInstance from '@/config/axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';

// Define a type for user data
type UserData = {
  twitter_id: string;
  display_name?: string | null;
  email?: string | null;
  photo_url?: string | null;
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
export const authenticateWithTwitter = (type: string) => async (dispatch: any) => {
  const auth = getAuth();
  const provider = new TwitterAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = TwitterAuthProvider.credentialFromResult(result);

    if (credential && result.user) {
      // Construct user data to store in Redux
      let userData: UserData;
      let api;

      if (type === 'signup') {
        userData = {
          twitter_id: result.user.uid,
          display_name: result.user.displayName,
          email: result.user.email,
          photo_url: result.user.photoURL,
          wallet_address: null, // Initialize wallet address as null
        };
        api = '/auth/register';
      } else {
        userData = {
          twitter_id: result.user.uid,
        };
        api = '/auth/login';
      }

      const response = await axiosInstance.post(api, userData);
      const payload = response?.data?.payload;
      if (payload) {
        dispatch(setUser(payload.user));
        dispatch(setToken(payload.token));
      }
    }
  } catch (error) {
    console.error('Twitter authentication failed', error);
    // Handle error (optional)
  }
};
