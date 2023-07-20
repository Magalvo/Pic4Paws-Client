import { Box } from '@mui/material';
import { getId } from '../api/users.api';
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const UserImage = ({ userId, size = '40px' }) => {
  const [imgUrl, setImgUrl] = useState('');

  const fetchImage = async () => {
    try {
      const response = await getId(userId);
      const Img = response.data.imgUrl;
      setImgUrl(Img);
    } catch (error) {
      console.log('Error fetching uer image', error);
    }
  };
  useEffect(() => {
    fetchImage();
  }, [userId]);

  return (
    <Box width={size} height={size}>
      {imgUrl && (
        <img
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          width={size}
          height={size}
          alt='user'
          src={imgUrl}
        />
      )}
    </Box>
  );
};

export default UserImage;
