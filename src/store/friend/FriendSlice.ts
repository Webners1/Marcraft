import { createSlice } from '@reduxjs/toolkit';

// Initial state for friends with categories and tags
const initialState = {
  profiles: [
    {
      id: 1,
      name: 'John Doe',
      username: 'john_doe',
      avatar: '/images/avatar/john_doe.jpg',
      rating: 5,
      category: 'Meme Token Influencer',
      tags: ['DeFi', 'GameFi', 'Mini-Apps'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'jane_smith',
      avatar: '/images/avatar/jane_smith.jpg',
      rating: 4,
      category: 'Trading Influencer',
      tags: ['DeFi', 'More...'],
    },
    {
      id: 3,
      name: 'Alex Johnson',
      username: 'alex_johnson',
      avatar: '/images/avatar/alex_johnson.jpg',
      rating: 5,
      category: 'Technical Influencer',
      tags: ['GameFi', 'Mini-Apps'],
    },
  ],
  filters: {
    category: 'All',
    tag: 'All',
    rating: 0,  // Add rating filter
  },
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    // Filter friends by category
    filterFriendsByCategory: (state, action) => {
      const { category } = action.payload;
      state.filters.category = category;

      if (category === 'All') {
        state.profiles = initialState.profiles;
      } else {
        state.profiles = initialState.profiles.filter((profile) => profile.category === category);
      }
    },

    // Filter friends by tag
    filterFriendsByTag: (state, action) => {
      const { tag } = action.payload;
      state.filters.tag = tag;

      if (tag === 'All') {
        state.profiles = initialState.profiles;
      } else {
        state.profiles = initialState.profiles.filter((profile) =>
          profile.tags.includes(tag)
        );
      }
    },

    // Filter friends by rating
    filterFriendsByRating: (state, action) => {
      const rating = action.payload;
      state.filters.rating = rating;

      if (rating === 0) {
        state.profiles = initialState.profiles;
      } else {
        state.profiles = initialState.profiles.filter((profile) => profile.rating >= rating);
      }
    },

    // Reset filters
    resetFriends: (state) => {
      state.profiles = initialState.profiles;
      state.filters.category = 'All';
      state.filters.tag = 'All';
      state.filters.rating = 0;
    },
  },
});

// Export the actions
export const { filterFriendsByCategory, filterFriendsByTag, filterFriendsByRating, resetFriends } = friendsSlice.actions;

// Export the reducer
export default friendsSlice.reducer;
