import { Box, Typography, useTheme } from '@mui/material';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useEffect } from 'react';
import { getUserFriends } from '../../api/users.api';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../../state/index.js';

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector(state => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await getUserFriends(userId);
      const data = response.data;

      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error('An error occurred when fetching the friends', error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // Fetch friends when userId changes

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {friends &&
            friends.map(friend => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={friend.firstName}
                subtitle={friend.occupation}
                userPicturePath={friend.imgUrl}
              />
            ))}
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
