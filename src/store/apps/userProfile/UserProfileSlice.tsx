import axiosInstance from '@/config/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchIndividualInfluencer = createAsyncThunk('get/influencer', async (id, token) => {
  try {
    const response = await axiosInstance.get(`/user/influencer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('fetch friend unsuccessful', error);
    // Handle error (optional)
    throw new Error((error instanceof Error && error.message) || 'Failed to fetch friend');
  }
});

// Define the type for the initial state
interface ProfilesState {
  profile: { [x: string]: any } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // API status
  error?: string | null; // For handling error messages
}

// Initial state for user profile
const initialState: ProfilesState = {
  profile: null,
  status: 'idle',
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
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndividualInfluencer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIndividualInfluencer.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.profile = payload.payload.user;
      })
      .addCase(fetchIndividualInfluencer.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message; // This will now contain the error message
      });
  },
});

// Export actions
export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;

// Export the reducer
export default userProfileSlice.reducer;
