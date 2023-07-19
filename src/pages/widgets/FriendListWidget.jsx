import { Box, Typography, useTheme } from '@mui/material';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { getUserFriends, patchingFriend } from '../../api/users.api';

const FriendListWidget = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const { palette } = useTheme();

  const getFriends = async () => {
    try {
      const response = await getUserFriends(userId);
      const data = response.data;
      setFriends(data);
    } catch (error) {
      console.error('An error occurred when fetching the friends', error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // Fetch friends when userId changes

  const handlePatchFriend = async friendId => {
    try {
      await patchingFriend(userId, friendId);
      getFriends(); // Fetch the updated friends list after patching
    } catch (error) {
      console.error('An error occurred when patching the friend', error);
    }
  };

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {friends.map(friend => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={friend.firstName}
              subtitle={friend.occupation}
              userPicturePath={friend.imgUrl}
              patchFriend={handlePatchFriend}
            />
          ))}
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
