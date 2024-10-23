import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to simulate fetching user profile data
export const fetchUserProfile = createAsyncThunk('userProfile/fetchUserProfile', async () => {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: 'John Doe',
          avatar: '/images/default-avatar.png',
          totalCustomers: 36358,
          totalEarnings: "$96,500",
          earningsThisMonth: "$48,820",
          expensesThisMonth: "$26,498",
          clients: "5",
          projects: [
            {
              id: '1', // Unique ID for Project A
              name: 'Project A',
              category: 'Software Development',
              status: 'In Progress',
              budget: '$30,000',
              image: '/images/projects/project-a.jpg',
              description: 'Developing a software solution using modern technologies to enhance business productivity.',
            },
            {
              id: '2', // Unique ID for Project B
              name: 'Project B',
              category: 'Web Development',
              status: 'Completed',
              budget: '$50,000',
              image: '/images/projects/project-b.jpg',
              description: 'Completed a fully responsive and dynamic e-commerce website using modern frontend and backend technologies.',
            },
            {
              id: '3', // Unique ID for Project C
              name: 'Project C',
              category: 'Mobile Development',
              status: 'Pending',
              budget: '$40,000',
              image: '/images/projects/project-c.jpg',
              description: 'Developing a cross-platform mobile application for better customer engagement.',
            },
            {
              id: '4', // Unique ID for Project D
              name: 'Project D',
              category: 'Data Analysis',
              status: 'Offer', // Special case for Offer status
              budget: '$20,000', // Using budget for the offer amount
              image: '/images/projects/project-d.jpg',
              description: 'Special offer for setting up a data analysis platform to gain insights into business performance.', // Offer description
              clients: 'Analytics Solutions Inc.', // Using clients as byWhom the offer was made
            },
          ],
          activeProjects: "59",
          newCustomers: 120,
        },
      });
    }, 1000); // Simulating an API delay
  });

  // Returning the user profile data after delay
  return response?.data;
});

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true; // Setting loading state to true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Storing the fetched profile data
        state.loading = false; // Setting loading state to false
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Storing the error message if fetch fails
      });
  },
});

export default userProfileSlice.reducer;
