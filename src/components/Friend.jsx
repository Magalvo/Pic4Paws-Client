import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import UserImage from '../components/userImage.jsx';
import { useNavigate } from 'react-router-dom';
import { patchingFriend } from '../api/users.api';
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../state/index.js';

// eslint-disable-next-line react/prop-types
const Friend = ({ friendId, name, subtitle }) => {
  const [isFriend, setIsFriend] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const friends = useSelector(state =>
    state.user?.friends ? state.user.friends : ''
  );
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const handlePatchFriend = async () => {
    try {
      const response = await patchingFriend(friendId, userId);
      const data = response.data; // Call the patchFriend API function
      dispatch(setFriends({ friends: data }));
      setIsFriend(prevIsFriend => !prevIsFriend); // Toggle the isFriend state
    } catch (error) {
      console.error('An error occurred when patching the friend:', error);
    }
  };

  useEffect(() => {
    // Ensure that friends array exists and is not empty
    if (friends && friends.length > 0) {
      const isAlreadyFriend = friends.some(friend => friend._id === friendId);
      setIsFriend(isAlreadyFriend);
    }
  }, [friends, friendId]);

  // Conditionally render IconButton
  if (userId === friendId) {
    return (
      <Box>
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <UserImage userId={friendId} />
          <Typography
            color={palette.neutral.main}
            variant='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer'
              }
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.neutral.medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        onClick={() => {
          navigate(`/profile/${friendId}`);
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }}
      >
        <UserImage userId={friendId} />
        <Box>
          <Typography
            color={palette.neutral.main}
            variant='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: palette.primary.light
              }
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.neutral.medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={handlePatchFriend}
        sx={{ backgroundColor: primaryLight, p: '0.06rem' }}
      >
        {isFriend ? (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </Box>
  );
};

export default Friend;
