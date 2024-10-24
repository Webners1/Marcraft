'use client';

import Avatar from '@mui/material/Avatar';
import { Grid, Rating, Box, Stack } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import BlankCard from '../../../../components/shared/BlankCard';
import { useRouter } from 'next/navigation';
import { IconBrandTwitter, IconSearch } from '@tabler/icons-react';
import InlineItemCard from '@/app/components/shared/InlineItemCard';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { fetchFriends, filterFriendsByCategory } from '@/store/friend/FriendSlice'; // Import filter action

const SocialIcons = [
  {
    name: 'Twitter',
    icon: <IconBrandTwitter size="18" color="#1C9CEA" />,
  },
];

// Function to get a random color from available color options
const getRandomColor = () => {
  const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRating = (key) => {
  const ratingObject = {
    Beginner: 1,
    Intermediate: 3,
    Expert: 5,
  };
  return ratingObject[key];
};

const FriendsCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get profiles data from Redux, and ensure it's defined with a fallback to an empty array
  const profiles = useSelector((state) => state.friends.profiles || []);
  const [search, setSearch] = useState('');

  console.log(profiles);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch(filterFriendsByCategory(e.target.value)); // Dispatch the filterFriends action
  };

  // Handle dynamic routing when clicking on a card
  const handleCardClick = (id) => {
    router.push(`/apps/user-profile/${id}`);
  };

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems={'center'} mt={2}>
            <Box>
              <Typography variant="h3">
                Influencers &nbsp;
                <Chip label={profiles.length} color="secondary" size="small" />
              </Typography>
            </Box>
            <Box ml="auto">
              <TextField
                id="outlined-search"
                placeholder="Search Influencers"
                size="small"
                type="search"
                variant="outlined"
                inputProps={{ 'aria-label': 'Search Influencers' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="14" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                value={search}
                onChange={handleSearchChange}
              />
            </Box>
          </Stack>
        </Grid>

        {/* Render profiles dynamically from Redux state */}
        {profiles.length > 0 ? ( // Ensure profiles array is not empty before mapping
          profiles.map((profile) => (
            <Grid item sm={12} lg={4} key={profile.id} onClick={() => handleCardClick(profile._id)}>
              <BlankCard className="hoverCard">
                <CardContent>
                  <Stack direction={'column'} gap={2} alignItems="center">
                    <Avatar
                      alt={profile.name}
                      src={profile.avatar}
                      sx={{ width: '80px', height: '80px' }}
                    />
                    <Box textAlign={'center'}>
                      <Typography variant="h5">{profile.name}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <Divider />
                <Box p={2} py={1} textAlign={'center'} sx={{ backgroundColor: 'grey.100' }}>
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Box width={'50%'}>
                      <Rating
                        name="read-only"
                        value={getRating(
                          profile.twitter_info.user_personality_analysis.experience_analysis
                            .experience_level,
                        )}
                        readOnly
                      />
                    </Box>
                    <Box width={'50%'}>
                      {SocialIcons.map((sicon) => (
                        <IconButton key={sicon.name}>{sicon.icon}</IconButton>
                      ))}
                    </Box>
                  </Box>
                  <InlineItemCard>
                    {/* Render each tag with a random color */}
                    {profile.twitter_info.user_post_stats_and_virality.top_tags.map(
                      (tag, index) => (
                        <Chip
                          key={index}
                          variant="outlined"
                          label={tag}
                          color={getRandomColor()} // Apply random color
                        />
                      ),
                    )}
                  </InlineItemCard>
                </Box>
              </BlankCard>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No profiles available</Typography>
        )}
      </Grid>
    </>
  );
};

export default FriendsCard;
