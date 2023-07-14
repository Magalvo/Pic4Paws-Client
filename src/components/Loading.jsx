import Lottie from 'lottie-react';
import { Box, useMediaQuery } from '@mui/material';
import Load from '../lotties/load1.json';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  return (
    <Box className='animation'>
      <Box
        backgroundColor='white'
        style={{
          backgroundColor: 'white',
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

export default Loading;
