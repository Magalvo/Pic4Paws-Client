import { Box } from '@mui/material';
import Paw from '../assets/images/Patinha.png';

const UserImage = ({ size = '60px' }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt='user'
        src={Paw}
      />
    </Box>
  );
};

export default UserImage;
