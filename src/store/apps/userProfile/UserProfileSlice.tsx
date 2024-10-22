import { createSlice } from '@reduxjs/toolkit';

// Initial state for user profile
const initialState = {
  profile: null,
  error: null,
};

// Create the user profile slice
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    // Set user profile action
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    // Clear user profile action
    clearUserProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
});

// Export actions
export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;

// Export the reducer
export default userProfileSlice.reducer;
