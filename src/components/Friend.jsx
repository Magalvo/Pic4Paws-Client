import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import UserImage from '../components/userImage.jsx';
import { useNavigate } from 'react-router-dom';
import { patchingFriend } from '../api/users.api';
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../state/index.js';

// eslint-disable-next-line react/prop-types
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const [isFriend, setIsFriend] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = localStorage.getItem('userId');
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const friends = useSelector(state => state.user.friends);
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  //const isFriended = friends.find(friend => friend._id === friendId.toString());

  const handlePatchFriend = async () => {
    try {
      const response = await patchingFriend(friendId, _id);
      const data = response.data; // Call the patchFriend API function
      dispatch(setFriends({ friends: data }));
      setIsFriend(prevIsFriend => !prevIsFriend); // Toggle the isFriend state
    } catch (error) {
      console.error('An error occurred when patching the friend:', error);
    }
  };

  return (
    <Box>
      <Box
        onClick={() => {
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}
      >
        <UserImage image={userPicturePath} size='55px' />
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
      <IconButton
        onClick={handlePatchFriend}
        sx={{ backgroundColor: primaryLight, p: '0.06rem' }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </Box>
  );
};

export default Friend;
