import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
} from '@mui/icons-material';

import { Box, Typography, Divider, useTheme } from '@mui/material';
import axios from 'axios';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/flexBetween';
import UserImage from '../../components/userImage';
import { getId } from '../../api/users.api';
import Loading from '../../components/Loading';
import LoaderDiv from '../../components/Skeleton';

// eslint-disable-next-line react/prop-types
const UserWidget = () => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const authToken = useSelector(state => state.authToken);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const userId = localStorage.getItem('userId');

  const getUser = async () => {
    const response = await getId(userId);
    const data = response.data;
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId, authToken]); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return <Loading />;
  }

  return (
    <WidgetWrapper>
      {/* Primeira Fila */}
      <FlexBetween
        gap='0.5rem'
        pb='1.1rem'
        onClick={() => navigate(`/profile/${userId}`)}
        color={dark}
      >
        <FlexBetween gap='1rem'>
          <UserImage userId={userId} />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer'
                }
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={medium}>friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* Segunda Fila */}
      <Box padding='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
          <LocationOnOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{user.location}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem'>
          <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{user.occupation}</Typography>
        </Box>
      </Box>

      <Divider />
      {/* TERCEIRA FILA */}
      <Box>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>
            {' '}
            Who&apos;s viewed your profile
          </Typography>
          <Typography color={main} fontWeight='500'>
            {user.viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}> Impressions of your post</Typography>
          <Typography color={main} fontWeight='500'>
            {user.impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* QUARTA FILA */}
      <Box p='1rem 0'>
        <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
          SocialProfiles
        </Typography>
        <FlexBetween gap='1rem' mb='0.5rem'>
          <FlexBetween>
            <img src='../assets/twitter.png' alt='twitter' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        {/* DIVI */}
        <FlexBetween gap='1rem'>
          <FlexBetween>
            <img src='../assets/linkedin.png' alt='linkedin' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
