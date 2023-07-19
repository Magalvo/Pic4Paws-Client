import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../../pages/navBar/index';
import FriendListWidget from '../../pages/widgets/FriendListWidget';
import MyPostWidget from '../../pages/widgets/MyPostWidget';
import PostsWidget from '../../pages/widgets/PostsWidget';
import UserWidget from '../../pages/widgets/UserWidget';
import { getId } from '../../api/users.api';
import Loading from '../../components/Loading';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  useEffect(() => {
    const getUser = async () => {
      const response = await getId(userId);
      const data = response.data;
      setUser(data);
    };
    getUser();
  }, [userId]); // Fetch user details whenever userId changes

  if (!user) return <Loading />;

  return (
    <Box>
      <NavBar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={id} imgUrl={user.imgUrl} />{' '}
          {/* Pass userId directly */}
          <Box m='2rem 0' />
          <FriendListWidget userId={id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget imgUrl={user.imgUrl} />
          <Box m='2rem 0' />
          <PostsWidget userId={id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
