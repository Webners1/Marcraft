import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating'; // Import Rating component
import { filterFriendsByCategory, filterFriendsByTag, filterFriendsByRating, resetFriends } from '@/store/friend/FriendSlice'; // Import correct actions
import { IconCircles, IconMoodSmile, IconDeviceLaptop, IconNotebook } from '@tabler/icons-react';

const ProductFilter = () => {
  const dispatch = useDispatch();
  
  // Access profiles and filters from Redux store
  const activeCategory = useSelector((state) => state.friends.filters.category);
  const activeTag = useSelector((state) => state.friends.filters.tag);
  const activeRating = useSelector((state) => state.friends.filters.rating); // Access active rating filter

  // Categories based on influencer type
  const filterCategory = [
    {
      id: 1,
      filterbyTitle: 'Filter by Influencer Type',
    },
    {
      id: 2,
      name: 'All',
      category: 'All',
      icon: IconCircles,
    },
    {
      id: 3,
      name: 'Meme Token Influencers',
      category: 'Meme Token Influencer',
      icon: IconMoodSmile,
    },
    {
      id: 4,
      name: 'Trading Influencers',
      category: 'Trading Influencer',
      icon: IconDeviceLaptop,
    },
    {
      id: 5,
      name: 'Technical Influencers',
      category: 'Technical Influencer',
      icon: IconNotebook,
    },
    {
      id: 6,
      divider: true,
    },
  ];

  // Example tag-based filtering options (you can adjust these based on available tags)
  const filterTags = [
    {
      id: 1,
      filterbyTitle: 'Filter by Tags',
    },
    {
      id: 2,
      name: 'All',
      tag: 'All',
    },
    {
      id: 3,
      name: 'DeFi',
      tag: 'DeFi',
    },
    {
      id: 4,
      name: 'GameFi',
      tag: 'GameFi',
    },
    {
      id: 5,
      name: 'Mini-Apps',
      tag: 'Mini-Apps',
    },
  ];

  // Handle filtering by category
  const handleCategoryFilter = (category) => {
    dispatch(filterFriendsByCategory({ category }));
  };

  // Handle filtering by tag
  const handleTagFilter = (tag) => {
    dispatch(filterFriendsByTag({ tag }));
  };

  // Handle filtering by rating
  const handleRatingFilter = (rating) => {
    dispatch(filterFriendsByRating(rating));
  };

  return (
    <>
      <List>
        {/* ------------------------------------------- */}
        {/* Category filter (Crypto Influencer Types) */}
        {/* ------------------------------------------- */}
        {filterCategory.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <Typography variant="subtitle2" fontWeight={600} px={3} mt={2} pb={2} key={filter.id}>
                {filter.filterbyTitle}
              </Typography>
            );
          } else if (filter.divider) {
            return <Divider key={filter.id} />;
          }

          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3 }}
              selected={activeCategory === filter.category}
              onClick={() => handleCategoryFilter(filter.category)}
              key={filter.id}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <filter.icon stroke="1.5" size="19" />
              </ListItemIcon>
              <ListItemText>{filter.name}</ListItemText>
            </ListItemButton>
          );
        })}

        <Divider />

        {/* ------------------------------------------- */}
        {/* Tag-based Filter */}
        {/* ------------------------------------------- */}
        {filterTags.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <Typography variant="subtitle2" fontWeight={600} px={3} mt={2} pb={2} key={filter.id}>
                {filter.filterbyTitle}
              </Typography>
            );
          }

          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3 }}
              selected={activeTag === filter.tag}
              onClick={() => handleTagFilter(filter.tag)}
              key={filter.id}
            >
              <ListItemText>{filter.name}</ListItemText>
            </ListItemButton>
          );
        })}

        <Divider />

        {/* ------------------------------------------- */}
        {/* Rating Filter */}
        {/* ------------------------------------------- */}
        <Box px={3} mt={2}>
          <Typography variant="subtitle2" fontWeight={600}>
            Filter by Rating
          </Typography>
          <Rating
            name="rating-filter"
            value={activeRating}
            onChange={(event, newValue) => handleRatingFilter(newValue || 0)}
          />
        </Box>

        <Divider />

        {/* ------------------------------------------- */}
        {/* Reset Filters */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Button variant="contained" onClick={() => dispatch(resetFriends())} fullWidth>
            Reset Filters
          </Button>
        </Box>
      </List>
    </>
  );
};

export default ProductFilter;
