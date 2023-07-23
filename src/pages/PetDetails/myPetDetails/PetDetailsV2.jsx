import UserWidget from '../../pages/widgets/UserWidget';
import NavBar from '../navBar/index';
import { Box, useMediaQuery } from '@mui/material';
import MyPostWidget from '../../pages/widgets/MyPostWidget';
import AdvertWidget from '../../pages/widgets/AdvertWidget';
import FriendListWidget from '../../pages/widgets/FriendListWidget';
import PostsWidget from '../../pages/widgets/PostsWidget';
import { useSelector } from 'react-redux';
import { findEmail } from '../../api/users.api';

const TestingPage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const userId = localStorage.getItem('userId');

  return (
    <Box>
      <NavBar userId={userId} />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box
          justifyContent='center'
          flexBasis={isNonMobileScreens ? '90%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
        
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <AdvertWidget />
            <Box m='2rem 0' />
            <FriendListWidget userId={userId} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TestingPage;
