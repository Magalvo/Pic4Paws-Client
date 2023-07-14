import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const PageComponent = () => {
  return (
    <Box
      bgcolor='#ffffff'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Box
        bgcolor='#ffffff'
        border='1px none'
        width='90%'
        maxWidth='1440px'
        px={2}
      >
        <Box py={4} textAlign='center'>
          <Typography
            variant='h1'
            color='textPrimary'
            style={{
              fontFamily: 'Inter-Black',
              fontSize: '32px',
              fontWeight: 900,
              marginBottom: '2rem'
            }}
          >
            Adopt or Support
          </Typography>
          <img
            src='undraw-good-doggy-re-eet7-2.png'
            alt='Undraw good doggy re'
            style={{ width: '100%', height: 'auto', marginBottom: '2rem' }}
          />
          <Typography
            variant='body1'
            color='textPrimary'
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '2rem'
            }}
          >
            With us you can find the perfect match with your furry best friend.
            Bring home your best friend after falling in love with their cutest
            photos or in case you can’t take them home you can also support them
            and our shelters to always provide the best care to our furry
            friends. If you become a member, with a symbolic donation you are
            helping us find the perfect family for our cute friends.
          </Typography>
          <Button variant='contained' color='primary' size='large'>
            Explore The Ark →
          </Button>
        </Box>
        <Box py={4} textAlign='center'>
          <Typography
            variant='h1'
            color='textPrimary'
            style={{
              fontFamily: 'Inter-Black',
              fontSize: '32px',
              fontWeight: 900,
              marginBottom: '2rem'
            }}
          >
            Volunteer To Help
          </Typography>
          <img
            src='91540-dog-love.png'
            alt='Https lottiefiles'
            style={{ width: '100%', height: 'auto', marginBottom: '2rem' }}
          />
          <Typography
            variant='body1'
            color='textPrimary'
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '2rem'
            }}
          >
            Volunteer with us and earn Paws®. When you volunteer at one of our
            events or at one of our shelters you are also earning Paws that you
            can later be spent helping one of our sheltered dogs or even
            exchanged for one of our merchandising items that are always
            supporting our shelters.
          </Typography>
          <Button variant='contained' color='primary' size='large'>
            Volunteer →
          </Button>
        </Box>
        <Box py={4} textAlign='center'>
          <Typography
            variant='h1'
            color='textPrimary'
            style={{
              fontFamily: 'Inter-Black',
              fontSize: '32px',
              fontWeight: 900,
              marginBottom: '2rem'
            }}
          >
            Create Memories
          </Typography>
          <img
            src='undraw-beach-day-cser-2.png'
            alt='Undraw beach day'
            style={{ width: '100%', height: 'auto', marginBottom: '2rem' }}
          />
          <Typography
            variant='body1'
            color='textPrimary'
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '2rem'
            }}
          >
            We know you love your best friend. That's why we have a diverse
            collection of souvenirs from mugs to T-Shirts that you can
            personalize with the pictures of your best friend. And of course, by
            doing that, you are always supporting us.
          </Typography>
          <Button variant='contained' color='primary' size='large'>
            Explore Memories Section →
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PageComponent;
