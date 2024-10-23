import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch user data from the API
export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async () => {
    const response = await fetch('https://marcraft-server.vercel.app/api/v1/user/get');
    const data = await response.json();
    return data; // Assuming data is an array of user objects
  }
);

// Initial state for friends
const initialState = {
  profiles: [],
  filters: {
    category: 'All',
    tag: 'All',
    rating: 0,  // Add rating filter
  },
  status: 'idle', // for API status ('idle', 'loading', 'succeeded', 'failed')
  error: null, // for API error handling
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
        state.profiles = state.originalProfiles; // Reset to the original profiles after filtering
      } else {
        state.profiles = state.originalProfiles.filter((profile) => profile.category === category);
      }
    },

    // Filter friends by tag
    filterFriendsByTag: (state, action) => {
      const { tag } = action.payload;
      state.filters.tag = tag;

      if (tag === 'All') {
        state.profiles = state.originalProfiles;
      } else {
        state.profiles = state.originalProfiles.filter((profile) =>
          profile.tags.includes(tag)
        );
      }
    },

    // Filter friends by rating
    filterFriendsByRating: (state, action) => {
      const rating = action.payload;
      state.filters.rating = rating;

      if (rating === 0) {
        state.profiles = state.originalProfiles;
      } else {
        state.profiles = state.originalProfiles.filter((profile) => profile.rating >= rating);
      }
    },

    // Reset filters
    resetFriends: (state) => {
      state.profiles = state.originalProfiles;
      state.filters.category = 'All';
      state.filters.tag = 'All';
      state.filters.rating = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Map API response to the profiles structure
        state.originalProfiles = action.payload.map((user: any) => ({
          id: user.user_personality_analysis.username, // Use username as unique identifier
          name: user.user_details.Name,
          description: user.user_details.Description,
          following: user.user_details.Following,
          followers: user.user_details.Followers,
          location: user.user_details.Location,
          website: user.user_details.Website,
          avatar: user.user_details["Profile Picture URL"],

          totalTweets: user.user_post_stats_and_virality.total_tweets,
          viralTweetsCount: user.user_post_stats_and_virality.viral_tweets_count,
          topTags: user.user_post_stats_and_virality.top_tags,
          likesGrowthPercentage: user.user_post_stats_and_virality["Likes Growth (%)"],
          retweetsGrowthPercentage: user.user_post_stats_and_virality["Retweets Growth (%)"],
          repliesGrowthPercentage: user.user_post_stats_and_virality["Replies Growth (%)"],
          averageWeeklyPosts: user.user_post_stats_and_virality.Average_Weekly_Posts,
          averageMonthlyPosts: user.user_post_stats_and_virality.Average_Monthly_Posts,
          averageYearlyPosts: user.user_post_stats_and_virality.Average_Yearly_Posts,
          averageLikes: user.user_post_stats_and_virality.Average_Likes,
          averageRetweets: user.user_post_stats_and_virality.Average_Retweets,
          averageReplies: user.user_post_stats_and_virality.Average_Replies,
          
          mostLikedPost: {
            text: user.user_post_stats_and_virality.Most_Liked_Post.text,
            likes: user.user_post_stats_and_virality.Most_Liked_Post.likes,
            retweets: user.user_post_stats_and_virality.Most_Liked_Post.retweets,
            replies: user.user_post_stats_and_virality.Most_Liked_Post.replies
          },
          mostRetweetedPost: {
            text: user.user_post_stats_and_virality.Most_Retweeted_Post.text,
            likes: user.user_post_stats_and_virality.Most_Retweeted_Post.likes,
            retweets: user.user_post_stats_and_virality.Most_Retweeted_Post.retweets,
            replies: user.user_post_stats_and_virality.Most_Retweeted_Post.replies
          },
          mostCommentedPost: {
            text: user.user_post_stats_and_virality.Most_Commented_Post.text,
            likes: user.user_post_stats_and_virality.Most_Commented_Post.likes,
            retweets: user.user_post_stats_and_virality.Most_Commented_Post.retweets,
            replies: user.user_post_stats_and_virality.Most_Commented_Post.replies
          },

          // Personality Analysis
          username: user.user_personality_analysis.username,
          cleanedTweets: user.user_personality_analysis.cleaned_tweets,
          tweetSummaries: user.user_personality_analysis.summaries,
          sentiments: user.user_personality_analysis.sentiments,
          entities: user.user_personality_analysis.entities,
          experienceLevel: user.user_personality_analysis.experience_analysis.experience_level,
          personalityTraits: user.user_personality_analysis.experience_analysis.personality_traits,
          
          // Sentiment Report
          sentimentReport: {
            positivePercentage: user.user_personality_analysis.sentiment_report.positive_percentage,
            negativePercentage: user.user_personality_analysis.sentiment_report.negative_percentage,
            positiveTags: user.user_personality_analysis.sentiment_report.positive_tags,
            negativeTags: user.user_personality_analysis.sentiment_report.negative_tags,
            monthlyStats: user.user_personality_analysis.sentiment_report.monthly_stats
          },

          imagePostsCount: user.image_posts_count,
          textOnlyPostsCount: user.text_only_posts_count,
          imagePostPercentage: user.image_post_percentage,
          topDomains: user.user_post_stats_and_virality.top_domains,
          
          // Category Information
          categoryPercentages: user.user_personality_analysis.category_percentages,
          categoryMatches: user.user_personality_analysis.category_matches
        }));
        state.profiles = state.originalProfiles;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { filterFriendsByCategory, filterFriendsByTag, filterFriendsByRating, resetFriends } = friendsSlice.actions;

// Export the reducer
export default friendsSlice.reducer;
