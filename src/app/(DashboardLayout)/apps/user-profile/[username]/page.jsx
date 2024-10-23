'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile, clearUserProfile } from '@/store/apps/userProfile/UserProfileSlice';
import PageContainer from '@/app/components/container/PageContainer';
import ProfileBanner from '@/app/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from '@/app/components/apps/userprofile/profile/IntroCard';
import ChildCard from '@/app/components/shared/ChildCard';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import { Avatar, Typography, Chip, Grid, Box, Tabs, Tab, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InlineItemCard from '@/app/components/shared/InlineItemCard';
import { IconMoodSmile, IconDeviceLaptop, IconNotebook } from '@tabler/icons-react';
import LinkIcon from '@mui/icons-material/Link';

// Dynamic import for charts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const colorClasses = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
const getRandomColorClass = () => colorClasses[Math.floor(Math.random() * colorClasses.length)];

export default function UserProfile({ params }) {
  const { username } = params;
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [tabIndex2, setTabIndex2] = useState(0);

  const friends = useSelector((state) => state.friends.profiles);
  const { profile, loading, error } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (username && friends.length > 0) {
      const userProfile = friends.find((friend) => friend.username === username);
      if (userProfile) {
        dispatch(setUserProfile(userProfile));
      }
    }

    return () => {
      dispatch(clearUserProfile());
    };
  }, [dispatch, username, friends]);

  // Categories and icons for influencer types
  const categories = [
    { id: 1, name: 'Meme Token Influencer', category: 'Meme Token Influencer', icon: IconMoodSmile },
    { id: 2, name: 'Trading Influencer', category: 'Trading Influencer', icon: IconDeviceLaptop },
    { id: 3, name: 'Technical Influencer', category: 'Technical Influencer', icon: IconNotebook },
  ];

  const influencerCategory = categories.find(c => c.category === profile?.category);
  const IconComponent = influencerCategory?.icon || null;

  // Theme and color settings
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const errorColor = theme.palette.error.main;
  const categoryPercentages = profile?.category_percentages || {};
  const categoryMatches = profile?.category_matches || {};

  // Chart configurations
  const pieChartOptions = {
    chart: { type: 'pie' },
    labels: Object.keys(categoryPercentages),
    colors: [primary, secondary, errorColor],
    legend: { position: 'bottom' },
  };
  const pieChartSeries = Object.values(categoryPercentages);
  const averages = {
    weekly: profile?.averageWeeklyPosts || 0,
    monthly: profile?.averageMonthlyPosts || 0,
    yearly: profile?.averageYearlyPosts || 0,
    likes: profile?.averageLikes || 0,
    retweets: profile?.averageRetweets || 0,
    replies: profile?.averageReplies || 0,
  };

  // Most engaged posts
  const mostLikedPost = profile?.mostLikedPost || {};
  const mostRetweetedPost = profile?.mostRetweetedPost || {};
  const mostCommentedPost = profile?.mostCommentedPost || {};

  // Bar chart for post averages
  const averagePostsBarChartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['Weekly', 'Monthly', 'Yearly'] },
    plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
    colors: [primary, secondary],
  };
  const averagePostsBarChartSeries = [
    { name: 'Posts', data: [averages.weekly, averages.monthly, averages.yearly] },
  ];

  // Bar chart for most engaged post metrics
  const engagementBarChartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['Likes', 'Retweets', 'Replies'] },
    plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
    colors: [primary, secondary, errorColor],
  };
  const engagementBarChartSeries = (post) => [
    { name: 'Engagement', data: [post.likes, post.retweets, post.replies] },
  ];

  const barChartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: Object.keys(categoryMatches) },
    colors: [primary],
    plotOptions: { bar: { horizontal: true, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
  };
  const barChartSeries = [
    { name: 'Tag & Content Matches', data: Object.values(categoryMatches).map(match => match.tag_and_content_matches) },
    { name: 'URL Matches', data: Object.values(categoryMatches).map(match => match.url_matches.length) },
  ];

  // Post Metrics
  const months = profile?.posts.map(post => post.month) || [];
  const likesData = profile?.posts.map(post => post.likes) || [];
  const commentsData = profile?.posts.map(post => post.comments) || [];
  const retweetsData = profile?.posts.map(post => post.retweets) || [];

  // Sentiment Analysis
  const goodSentimentPosts = profile?.posts.filter(post => post.sentiment === 'good').length || 0;
  const badSentimentPosts = profile?.posts.filter(post => post.sentiment === 'bad').length || 0;

  // Graphics vs Text Data
  const optionsGraphicsVsTextChart = {
    chart: { type: 'pie' },
    labels: ['Graphics', 'Text'],
    colors: [primary, secondary],
    legend: { position: 'bottom' },
  };
  const seriesGraphicsVsTextChart = [
    profile?.graphicsVsText?.graphics || 0,
    profile?.graphicsVsText?.text || 0,
  ];

  const optionsLineChart = {
    chart: { id: 'line-chart', toolbar: { show: false }, foreColor: '#adb0bb' },
    stroke: { curve: 'smooth' },
    xaxis: { categories: months },
    colors: [primary, secondary, errorColor],
    legend: { show: true, position: 'bottom' },
  };
  const seriesLineChart = [
    { name: 'Likes', data: likesData },
    { name: 'Comments', data: commentsData },
    { name: 'Retweets', data: retweetsData },
  ];

  const optionsSentimentChart = {
    chart: { type: 'pie' },
    labels: ['Good Sentiment', 'Bad Sentiment'],
    colors: [primary, errorColor],
    legend: { position: 'bottom' },
  };
  const seriesSentimentChart = [goodSentimentPosts, badSentimentPosts];

  // Top 5 URLs
  const getTop5Urls = () => {
    if (!profile || !categoryMatches) return [];
    const urls = [];
    Object.keys(categoryMatches).forEach(category => {
      const match = categoryMatches[category];
      if (match.url_matches && match.url_matches.length > 0) {
        urls.push(...match.url_matches);
      }
    });
    return urls.slice(0, 5);
  };

  const top5Urls = getTop5Urls();

  // Expertise Level based on rating
  const expertiseLevel = profile?.rating > 4 ? 'Expert' : profile?.rating > 3 ? 'Intermediate' : 'Beginner';

  // Handle tab change for categories
  const handleTabChange = (event, newIndex) => setTabIndex(newIndex);
  const handleTabChange2 = (event, newIndex) => setTabIndex2(newIndex);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!profile) return <Typography>No profile found</Typography>;

  return (
    <PageContainer title={`Profile of ${profile.name}`} description={`Profile page of ${profile.name}`}>
      <Grid container spacing={3}>
        {/* Profile Banner */}
        <Grid item xs={12}>
          <ProfileBanner
            name={profile.name}
            job={profile.job || 'Unknown Job'}
            avatar={profile.avatar || '/images/default-avatar.png'}
            coverImage={profile.coverImage || '/images/backgrounds/default-bg.jpg'}
            posts={profile.posts?.length || 0}
            followers={profile.followers || 0}
            following={profile.following || 0}
            socialLinks={profile.socialLinks}
          />
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ChildCard>
                <Typography fontWeight={600} variant="h5" mb={2}>Influencer Type Tags</Typography>
                <InlineItemCard>
                  {profile.tags.map((tag, index) => (
                    <Chip key={index} avatar={<Avatar>{tag[0]}</Avatar>} label={tag} color={getRandomColorClass()} />
                  ))}
                </InlineItemCard>
              </ChildCard>
            </Grid>

            <Grid item xs={12}>
              <IntroCard
                name={profile.name}
                bio={profile.bio || 'No bio available'}
                job={profile.job || 'Unknown job'}
                email={profile.email}
                website={profile.website || 'No website'}
                location={profile.location || 'Unknown location'}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Main Content: Charts and Metrics */}
        <Grid item xs={12} md={8}>
          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Post Metrics Over Time</Typography>
              <Chart options={optionsLineChart} series={seriesLineChart} type="line" height="300px" width="100%" />
            </ChildCard>
          </Box>

          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Graphics vs Text Ratio</Typography>
              <Chart options={optionsGraphicsVsTextChart} series={seriesGraphicsVsTextChart} type="pie" height="300px" width="100%" />
              <Typography variant="body2" color="textSecondary" mt={2} fontStyle="italic">
                The ratio refers to the proportion of images to text content in posts. Higher ratio means more visuals.
              </Typography>
            </ChildCard>
          </Box>

          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Influencer Category & Expertise</Typography>
              <Box display="flex" alignItems="center" mb={3}>
                {IconComponent && <IconComponent size="32px" style={{ marginRight: '12px' }} />}
                <Typography variant="h6" fontWeight={600}>
                  {influencerCategory?.name || 'Unknown Category'}
                </Typography>
              </Box>
              <Typography variant="body1" color="textSecondary">
                {profile.name} is a {expertiseLevel} influencer in the {influencerCategory?.name || 'Unknown Category'} domain. Their content attracts a significant audience.
              </Typography>
            </ChildCard>
          </Box>

          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Sentiment Analysis of Posts</Typography>
              <Chart options={optionsSentimentChart} series={seriesSentimentChart} type="pie" height="300px" />
              <Typography variant="body2" color="textSecondary" mt={2} fontStyle="italic">
                Positive sentiment refers to favorable posts, while negative sentiment shows criticism.
              </Typography>
            </ChildCard>
          </Box>
        </Grid>
                  
                     {/* Main Content: Charts and Metrics */}
        <Grid item xs={12} md={8}>
          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Post Averages (Weekly, Monthly, Yearly)</Typography>
              <Chart options={averagePostsBarChartOptions} series={averagePostsBarChartSeries} type="bar" height="300px" width="100%" />
            </ChildCard>
          </Box>

          {/* Most Engaged Posts */}
          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Most Liked Post</Typography>
              <Typography variant="body1" color="textSecondary" mb={2}>{mostLikedPost.text}</Typography>
              <Chart options={engagementBarChartOptions} series={engagementBarChartSeries(mostLikedPost)} type="bar" height="300px" width="100%" />
            </ChildCard>
          </Box>

          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Most Retweeted Post</Typography>
              <Typography variant="body1" color="textSecondary" mb={2}>{mostRetweetedPost.text}</Typography>
              <Chart options={engagementBarChartOptions} series={engagementBarChartSeries(mostRetweetedPost)} type="bar" height="300px" width="100%" />
            </ChildCard>
          </Box>

          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Most Commented Post</Typography>
              <Typography variant="body1" color="textSecondary" mb={2}>{mostCommentedPost.text}</Typography>
              <Chart options={engagementBarChartOptions} series={engagementBarChartSeries(mostCommentedPost)} type="bar" height="300px" width="100%" />
            </ChildCard>
          </Box>
        </Grid>

        {/* Category Percentages and Matches */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Tabs value={tabIndex2} onChange={handleTabChange2} indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab label="Category Percentages" />
                <Tab label="Category Matches" />
                <Tab label="Top 5 URLs" />
              </Tabs>
            </Box>

            {/* Category Percentages Tab */}
            {tabIndex2 === 0 && (
              <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Tweet Category Distribution for {profile.name}
                </Typography>
                <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height="300px" />
                <Typography variant="body2" color="textSecondary" mt={2} fontStyle="italic">
                  Distribution of tweets across categories. Each category represents a particular theme.
                </Typography>
              </CardContent>
            )}

            {/* Category Matches Tab */}
            {tabIndex2 === 1 && (
              <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>Tag & Content Matches for {profile.name}</Typography>
                <Chart options={barChartOptions} series={barChartSeries} type="bar" height="300px" />
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '16px' }} fontStyle="italic">
                  Shows the frequency of tags/keywords appearing in posts and the URLs they are associated with.
                </Typography>
              </CardContent>
            )}

            {/* Top 5 URLs Tab */}
            {tabIndex2 === 2 && (
              <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>Top 5 URLs Shared by {profile.name}</Typography>
                {top5Urls.length > 0 ? (
                  <List>
                    {top5Urls.map((url, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><LinkIcon color="primary" /></ListItemIcon>
                        <ListItemText primary={url} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body1" color="textSecondary">No URLs found</Typography>
                )}
              </CardContent>
            )}
          </Card>
        </Grid>

        {/* Top 10 Tags and Post Virality */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
            <Box sx={{ backgroundColor: theme.palette.background.default, borderBottom: `1px solid ${theme.palette.divider}`, padding: '10px 16px', display: 'flex', justifyContent: 'center' }}>
              <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab label="Top 10 Tags" />
                <Tab label="Post Virality" />
              </Tabs>
            </Box>

            {tabIndex === 0 && (
              <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>Top 10 Tags Used by {profile.name}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: '12px 0' }}>
                  {profile.tags.slice(0, 10).map((tag, index) => (
                    <Chip key={index} label={tag} color={getRandomColorClass()} sx={{ fontWeight: 600, fontSize: '14px', padding: '6px 12px', borderRadius: '8px' }} />
                  ))}
                </Box>
              </CardContent>
            )}

            {tabIndex === 1 && (
              <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>Post Virality Analysis</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.paper, padding: '20px', borderRadius: '8px', boxShadow: 1, textAlign: 'center' }}>
                  <Typography variant="h4" color={theme.palette.primary.main} fontWeight={700}>{viralityPercentage.toFixed(2)}%</Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ marginLeft: '10px' }}>Overall Engagement (Likes, Comments, Retweets)</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '16px' }}>
                  Virality is calculated based on total interactions per post divided by the number of posts.
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }} fontStyle="italic">
                  A higher virality percentage indicates more engagement (likes, comments, retweets).
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
