import './Styles.css';
import { Box, Typography } from '@mui/material';
import Image from '../../assets/images/hero3.jpg';
import { format } from 'timeago.js';
import { getId } from '../../api/users.api';
import { useEffect, useState } from 'react';

const Message = ({ message, own }) => {
  const [image, setImage] = useState(null);

  const getUserPic = async () => {
    const res = await getId(message.sender);
    const avatarPic = res.data.imgUrl;
    setImage(avatarPic);
  };
  useEffect(() => {
    getUserPic();
  }, []);

  return (
    <Box className={own ? 'message own' : 'message'}>
      <Box className='messageTop'>
        <img src={image} alt='ProfilePic' className='messageImg' />
        <Typography className='messageText'> {message.text}</Typography>
      </Box>
      <Box className='messageBottom'>{format(message.createdAt)}</Box>
    </Box>
  );
};

export default Message;
