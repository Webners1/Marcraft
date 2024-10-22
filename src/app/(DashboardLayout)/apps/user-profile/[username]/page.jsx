'use client'; // Marking this as a client component

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile, clearUserProfile } from '@/store/apps/userProfile/UserProfileSlice';
import PageContainer from '@/app/components/container/PageContainer';
import ProfileBanner from '@/app/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from '@/app/components/apps/userprofile/profile/IntroCard';
import ChildCard from '@/app/components/shared/ChildCard';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import { Avatar, Typography, Chip, Grid, Box, Tabs, Tab, Card, CardContent,List, ListItem, ListItemIcon ,ListItemText } from '@mui/material';
import InlineItemCard from '@/app/components/shared/InlineItemCard';
import { IconMoodSmile, IconDeviceLaptop, IconNotebook } from '@tabler/icons-react';
import LinkIcon from '@mui/icons-material/Link';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const colorClasses = ['primary', 'secondary', 'success', 'warning', 'error', 'info']; // Define color classes

const getRandomColorClass = () => {
  return colorClasses[Math.floor(Math.random() * colorClasses.length)]; // Randomly select a color class
};

export default function UserProfile({ params }) {
  const { username } = params; // Get the username from the URL
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0); // Track the current tab
  const [tabIndex2, setTabIndex2] = useState(0); // Track the current tab

  const friends = useSelector((state) => state.friends.profiles); // Get profiles from friendsSlice
  const { profile, loading, error } = useSelector((state) => state.userProfile); // Get the current profile

  useEffect(() => {
    if (username && friends.length > 0) {
      // Filter the user profile based on username
      const userProfile = friends.find((friend) => friend.username === username);
      if (userProfile) {
        dispatch(setUserProfile(userProfile)); // Set the filtered profile
      }
    }

    // Clear profile when component unmounts
    return () => {
      dispatch(clearUserProfile());
    };
  }, [dispatch, username, friends]);

  // Categories definition
  const categories = [
    { id: 1, name: 'Meme Token Influencer', category: 'Meme Token Influencer', icon: IconMoodSmile },
    { id: 2, name: 'Trading Influencer', category: 'Trading Influencer', icon: IconDeviceLaptop },
    { id: 3, name: 'Technical Influencer', category: 'Technical Influencer', icon: IconNotebook },
  ];

  // Get influencer's category from profile
  const influencerCategory = categories.find(c => c.category === profile?.category);
  const IconComponent = influencerCategory?.icon || null;

  // Theme colors
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const errorColor = theme.palette.error.main;
  const category_percentages = profile?.category_percentages || {};
  const category_matches = profile?.category_matches || {};


  const pieChartOptions = {
    chart: { type: 'pie' },
    labels: Object.keys(category_percentages),
    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.error.main],
    legend: { position: 'bottom' },
  };

  const pieChartSeries = Object.values(category_percentages);

  const barChartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: Object.keys(category_matches) }, // Category names as labels
    colors: [theme.palette.primary.main],
    plotOptions: {
      bar: { horizontal: true, columnWidth: '50%' },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
  };

  const barChartSeries = [
    {
      name: 'Tag & Content Matches',
      data: Object.values(category_matches).map((match) => match.tag_and_content_matches), // Tag and content matches
    },
    {
      name: 'URL Matches',
      data: Object.values(category_matches).map((match) => match.url_matches), // URL matches
    },
  ];

  // Posts Data for Charts
  const months = profile?.posts.map(post => post.month) || [];
  const likesData = profile?.posts.map(post => post.likes) || [];
  const commentsData = profile?.posts.map(post => post.comments) || [];
  const retweetsData = profile?.posts.map(post => post.retweets) || [];

  // Sentiment Analysis: Good vs Bad Posts
  const goodSentimentPosts = profile?.posts.filter(post => post.sentiment === 'good').length || 0;
  const badSentimentPosts = profile?.posts.filter(post => post.sentiment === 'bad').length || 0;

  // Expertise Level based on profile rating
  const expertiseLevel = profile?.rating > 4 ? 'Expert' : profile?.rating > 3 ? 'Intermediate' : 'Beginner';

  // Calculate Post Virality
  const totalInteractions = likesData.reduce((sum, likes) => sum + likes, 0)
                        + commentsData.reduce((sum, comments) => sum + comments, 0)
                        + retweetsData.reduce((sum, retweets) => sum + retweets, 0);
  const viralityPercentage = (totalInteractions / (profile?.posts.length || 1)) * 100;

  // Chart configurations for various metrics
 

  const optionspiechart = {
    chart: { id: 'pie-chart', fontFamily: "'Plus Jakarta Sans', sans-serif", foreColor: '#adb0bb', toolbar: { show: false } },
    labels: ['Graphics', 'Text'],
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: '70px' } } },
    legend: { show: true, position: 'bottom', width: '50px' },
    colors: [primary, secondary],
    tooltip: { fillSeriesColor: false },
  };

  const seriespiechart = [
    profile?.graphicsVsText?.graphics || 0, 
    profile?.graphicsVsText?.text || 0
  ];

  const optionsLineChart = {
    chart: { id: 'line-chart', fontFamily: "'Plus Jakarta Sans', sans-serif", foreColor: '#adb0bb', toolbar: { show: false } },
    stroke: { curve: 'smooth' },
    xaxis: { categories: months },
    tooltip: { y: { formatter(val) { return `${val}`; } }, theme: 'dark' },
    colors: [primary, secondary, errorColor],
    legend: { show: true, position: 'bottom' },
  };

  const seriesLineChart = [
    { name: 'Likes', data: likesData },  
    { name: 'Comments', data: commentsData },  
    { name: 'Retweets', data: retweetsData },  
  ];

  const optionsSentimentChart = {
    chart: { id: 'sentiment-chart', fontFamily: "'Plus Jakarta Sans', sans-serif", foreColor: '#adb0bb', toolbar: { show: false } },
    labels: ['Good Sentiment', 'Bad Sentiment'],
    colors: [primary, errorColor],
    legend: { show: true, position: 'bottom' },
  };

  const seriesSentimentChart = [goodSentimentPosts, badSentimentPosts];

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleTabChange2 = (event, newIndex) => {
    setTabIndex2(newIndex);
  };

  const getTop5Urls = () => {
    if (!profile || !category_matches) return [];

    const urls = [];

    // Loop through category_matches to extract URL matches
    Object.keys(category_matches).forEach((category) => {
      const match = category_matches[category];
      if (match.url_matches && match.url_matches.length > 0) {
        urls.push(...match.url_matches); // Combine all URLs
      }
    });

    // Return the top 5 URLs
    return urls.slice(0, 5); // Taking the first 5 URLs
  };

  const top5Urls = getTop5Urls(); // Call the function to get the top 5 URLs

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!profile) return <Typography>No profile found</Typography>;

  return (
    <PageContainer title={`Profile of ${profile.name}`} description={`Profile page of ${profile.name}`}>
      <Grid container spacing={3}>
        {/* Banner Section */}
        <Grid item xs={12}>
          <ProfileBanner
            name={profile.name}
            job={profile.job || 'Unknown Job'}
            avatar={profile.avatar || '/images/default-avatar.png'}
            coverImage={profile.coverImage || '/images/backgrounds/default-bg.jpg'}
            posts={profile.posts || 0}
            followers={profile.followers || 0}
            following={profile.following || 0}
            socialLinks={profile.socialLinks}
          />
        </Grid>

        {/* Sidebar Section: Influencer Tags and Intro */}
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
              <Typography fontWeight={600} variant="h5" mb={2}>Images-Content Ratio</Typography>
              <Chart options={optionspiechart} series={seriespiechart} type="pie" height="300px" width="100%" />
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
                {profile.name} is a {expertiseLevel} influencer in the {influencerCategory?.name || 'Unknown Category'} domain. They have been creating high-quality content, attracting a significant audience with their unique insights.
              </Typography>
            </ChildCard>
          </Box>

          <Box mb={3}>
            <ChildCard>
              <Typography fontWeight={600} variant="h5" mb={2}>Sentiment Analysis of Posts</Typography>
              <Chart options={optionsSentimentChart} series={seriesSentimentChart} type="pie" height="300px" />
            </ChildCard>
          </Box>
        </Grid>

        {/* Category Percentages and Matches Tabs */}
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
      <Tabs
        value={tabIndex2} // use tabIndex2 consistently
        onChange={handleTabChange2} // Correct event handler
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Category Percentages" />
        <Tab label="Category Matches" />
        <Tab label="Top 5 URLs" /> {/* Tab for Top 5 URLs */}
      </Tabs>
    </Box>

    {/* Category Percentages Tab */}
    {tabIndex2 === 0 && (
      <CardContent sx={{ padding: '24px' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Tweet Category Distribution for {profile.name}
        </Typography>
        <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height="300px" />
      </CardContent>
    )}

    {/* Category Matches Tab */}
    {tabIndex2 === 1 && (
      <CardContent sx={{ padding: '24px' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Tag & Content Matches for {profile.name}
        </Typography>
        <Chart options={barChartOptions} series={barChartSeries} type="bar" height="300px" />
      </CardContent>
    )}

    {/* Top 5 URLs Tab */}
    {tabIndex2 === 2 && (
      <CardContent sx={{ padding: '24px' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Top 5 URLs Shared by {profile.name}
        </Typography>

        {/* Check if top5Urls is empty */}
        {top5Urls.length > 0 ? (
          <List>
            {top5Urls.map((url, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <LinkIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={url} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No URLs found
          </Typography>
        )}
      </CardContent>
    )}
  </Card>
</Grid>


        {/* Top 10 Tags and Post Virality Tabs */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
            <Box sx={{ backgroundColor: theme.palette.background.default, borderBottom: `1px solid ${theme.palette.divider}`, padding: '10px 16px', display: 'flex', justifyContent: 'center' }}>
              <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth" sx={{ width: '100%', '& .MuiTab-root': { minWidth: '50%', fontWeight: 600 } }}>
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
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
