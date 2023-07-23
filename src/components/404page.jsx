import Lottie from 'lottie-react';
import { Box, useMediaQuery } from '@mui/material';
import Load from '../lotties/404notfound.json';

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  return (
    <Box
      className='animation'
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Box
        style={{
          position: 'relative'
        }}
      >
        <Lottie
          options={defaultOptions}
          animationData={Load}
          height={100}
          width={100}
        />
      </Box>
    </Box>
  );
};

export default NotFound;
