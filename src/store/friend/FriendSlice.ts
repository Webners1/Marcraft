import { createSlice } from '@reduxjs/toolkit';

// Initial state for friends with additional statistics for graphs and UI
const initialState = {
  profiles: [
    {
      id: 1,
      name: 'John Doe',
      username: 'john_doe',
      avatar: '/images/avatar/john_doe.jpg',
      coverImage: '/images/backgrounds/profilebg.jpg',
      bio: 'Hello, I am John Doe. I love making websites and graphics. Lorem ipsum dolor sit amet.',
      job: 'Meme Token Influencer',
      email: 'john_doe@example.com',
      location: 'New York, USA - 100001',
      website: 'www.johndoe.com',
      rating: 5,
      category: 'Meme Token Influencer',
      tags: ['DeFi', 'GameFi', 'Mini-Apps'],
      socialLinks: {
        facebook: 'https://facebook.com/johndoe',
        twitter: 'https://twitter.com/johndoe',
        dribbble: 'https://dribbble.com/johndoe',
        youtube: 'https://youtube.com/johndoe',
      },
      posts: [
        { month: 'Feb', likes: 44, comments: 76, retweets: 35, sentiment: 'good' },
        { month: 'Mar', likes: 55, comments: 85, retweets: 41, sentiment: 'good' },
        { month: 'Apr', likes: 57, comments: 101, retweets: 36, sentiment: 'good' },
        { month: 'May', likes: 56, comments: 98, retweets: 26, sentiment: 'bad' },
        { month: 'Jun', likes: 61, comments: 87, retweets: 45, sentiment: 'good' },
        { month: 'Jul', likes: 58, comments: 105, retweets: 48, sentiment: 'bad' },
        { month: 'Aug', likes: 63, comments: 91, retweets: 52, sentiment: 'good' },
        { month: 'Sep', likes: 60, comments: 114, retweets: 53, sentiment: 'bad' },
        { month: 'Oct', likes: 66, comments: 94, retweets: 41, sentiment: 'good' },
      ],
      graphicsVsText: { graphics: 45, text: 55 },
      followers: 3586,
      following: 2659,
      totalPosts: 938,
      category_percentages: {
        'Meme Token Influencer': 70,
        'Trading Influencer': 20,
        'Technical Influencer': 10,
      },
      category_matches: {
        'Meme Token Influencer': { tag_and_content_matches: 15, url_matches: ['dogecoin.com', 'shibaswap.com', 'memetokens.com', 'moontoken.com', 'degenswap.com'] },
        'Trading Influencer': { tag_and_content_matches: 3, url_matches: ['tradingview.com', 'cryptosignals.com'] },
        'Technical Influencer': { tag_and_content_matches: 2, url_matches: ['blockchaindev.com'] },
      },
      // Top 5 URLs logic added here
      top5Urls: [
        'dogecoin.com',
        'shibaswap.com',
        'memetokens.com',
        'moontoken.com',
        'degenswap.com'
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'jane_smith',
      avatar: '/images/avatar/jane_smith.jpg',
      coverImage: '/images/backgrounds/profilebg2.jpg',
      bio: 'Hi, I am Jane Smith. Passionate about trading and investments.',
      job: 'Trading Influencer',
      email: 'jane_smith@example.com',
      location: 'San Francisco, USA - 94101',
      website: 'www.janesmith.com',
      rating: 4,
      category: 'Trading Influencer',
      tags: ['DeFi', 'More...'],
      socialLinks: {
        facebook: 'https://facebook.com/janesmith',
        twitter: 'https://twitter.com/janesmith',
        dribbble: null,
        youtube: 'https://youtube.com/janesmith',
      },
      posts: [
        { month: 'Feb', likes: 30, comments: 40, retweets: 20, sentiment: 'good' },
        { month: 'Mar', likes: 35, comments: 45, retweets: 25, sentiment: 'good' },
        { month: 'Apr', likes: 40, comments: 50, retweets: 30, sentiment: 'bad' },
        { month: 'May', likes: 45, comments: 55, retweets: 35, sentiment: 'good' },
        { month: 'Jun', likes: 50, comments: 60, retweets: 40, sentiment: 'bad' },
        { month: 'Jul', likes: 55, comments: 65, retweets: 45, sentiment: 'good' },
        { month: 'Aug', likes: 60, comments: 70, retweets: 50, sentiment: 'bad' },
        { month: 'Sep', likes: 65, comments: 75, retweets: 55, sentiment: 'good' },
        { month: 'Oct', likes: 70, comments: 80, retweets: 60, sentiment: 'bad' },
      ],
      graphicsVsText: { graphics: 60, text: 40 },
      followers: 4821,
      following: 3540,
      totalPosts: 1201,
      category_percentages: {
        'Meme Token Influencer': 30,
        'Trading Influencer': 60,
        'Technical Influencer': 10,
      },
      category_matches: {
        'Meme Token Influencer': { tag_and_content_matches: 5, url_matches: ['shibaswap.com', 'moontoken.com', 'dogecoin.com'] },
        'Trading Influencer': { tag_and_content_matches: 12, url_matches: ['tradingview.com', 'cryptosignals.com', 'coinmarketcap.com', 'investing.com', 'kraken.com', 'binance.com'] },
        'Technical Influencer': { tag_and_content_matches: 2, url_matches: ['blockchaindev.com'] },
      },
      top5Urls: [
        'tradingview.com',
        'cryptosignals.com',
        'coinmarketcap.com',
        'investing.com',
        'kraken.com'
      ],
    },
    {
      id: 3,
      name: 'Alex Johnson',
      username: 'alex_johnson',
      avatar: '/images/avatar/alex_johnson.jpg',
      coverImage: '/images/backgrounds/profilebg3.jpg',
      bio: 'Tech enthusiast and a lover of all things related to GameFi.',
      job: 'Technical Influencer',
      email: 'alex_johnson@example.com',
      location: 'Los Angeles, USA - 90001',
      website: 'www.alexjohnson.com',
      rating: 5,
      category: 'Technical Influencer',
      tags: ['GameFi', 'Mini-Apps'],
      socialLinks: {
        facebook: 'https://facebook.com/alexjohnson',
        twitter: 'https://twitter.com/alexjohnson',
        dribbble: 'https://dribbble.com/alexjohnson',
        youtube: null,
      },
      posts: [
        { month: 'Feb', likes: 80, comments: 100, retweets: 60, sentiment: 'good' },
        { month: 'Mar', likes: 85, comments: 105, retweets: 65, sentiment: 'good' },
        { month: 'Apr', likes: 90, comments: 110, retweets: 70, sentiment: 'good' },
        { month: 'May', likes: 95, comments: 115, retweets: 75, sentiment: 'bad' },
        { month: 'Jun', likes: 100, comments: 120, retweets: 80, sentiment: 'good' },
        { month: 'Jul', likes: 105, comments: 125, retweets: 85, sentiment: 'bad' },
        { month: 'Aug', likes: 110, comments: 130, retweets: 90, sentiment: 'good' },
        { month: 'Sep', likes: 115, comments: 135, retweets: 95, sentiment: 'bad' },
        { month: 'Oct', likes: 120, comments: 140, retweets: 100, sentiment: 'good' },
      ],
      graphicsVsText: { graphics: 50, text: 50 },
      followers: 6210,
      following: 4298,
      totalPosts: 1843,
      category_percentages: {
        'Meme Token Influencer': 10,
        'Trading Influencer': 20,
        'Technical Influencer': 70,
      },
      category_matches: {
        'Meme Token Influencer': { tag_and_content_matches: 2, url_matches: ['shibaswap.com'] },
        'Trading Influencer': { tag_and_content_matches: 3, url_matches: ['binance.com'] },
        'Technical Influencer': { tag_and_content_matches: 18, url_matches: ['soliditylang.org', 'etherscan.io', 'github.com', 'blockchaindev.com', 'arbitrum.io', 'optimism.io'] },
      },
      top5Urls: [
        'soliditylang.org',
        'etherscan.io',
        'github.com',
        'blockchaindev.com',
        'arbitrum.io'
      ],
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
