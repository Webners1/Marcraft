import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

// Define a type for user data
type UserData = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  walletAddress: string | null; // Add wallet address to user data
};

type CounterState = {
  value: number;
  user: UserData | null;
};

const initialState: CounterState = {
  value: 0,
  user: null,  // Initial user state
};

export const counter = createSlice({
  name: "counter",
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
    setWalletAddress: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.walletAddress = action.payload; // Update wallet address
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
  setWalletAddress, // Export the wallet address action
} = counter.actions;

export default counter.reducer;

// Function to handle Twitter Authentication
export const authenticateWithTwitter = () => async (dispatch: any) => {
  const auth = getAuth();
  const provider = new TwitterAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = TwitterAuthProvider.credentialFromResult(result);
    
    if (credential && result.user) {
      // Construct user data to store in Redux
      const userData: UserData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        walletAddress: null, // Initialize wallet address as null
      };

      // Dispatch action to store user data
      dispatch(setUser(userData));
    }
  } catch (error) {
    console.error("Twitter authentication failed", error);
    // Handle error (optional)
  }
};
