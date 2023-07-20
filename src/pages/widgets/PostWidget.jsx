/* eslint-disable react/prop-types */
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  SendOutlined
} from '@mui/icons-material';

import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputAdornment,
  TextField
} from '@mui/material';
import FlexBetween from '../../components/flexBetween';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPost } from '../../state/index.js';
import { liking, addComment } from '../../api/posts.api';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  imgUrl,
  userPicturePath,
  likes,
  comments
}) => {
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  //const loggedInUserId = useSelector(state => state.user._id);
  const loggedInUserId = localStorage.getItem('userId');
  const [postLikes, setPostLikes] = useState(likes);
  //const isLiked = Boolean(likes[loggedInUserId]);

  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.neutral.medium;

  const patchLike = async () => {
    const response = await liking(postId, loggedInUserId);
    const updatedPost = response.data;
    setPostLikes(updatedPost.likes);
    dispatch(setPost({ post: updatedPost }));
  };

  const handleCommentSubmit = async event => {
    event.preventDefault();

    if (commentText.trim() === '') {
      return;
    }

    try {
      const response = await addComment(postId, loggedInUserId, commentText);
      const updatedPost = response.data;
      setCommentText('');
      setIsComments(true);
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  /* const patchLike = async () => {
    const response = await liking(postId, loggedInUserId);
    const updatedPost = response.data;
    dispatch(setPost({ post: updatedPost }));
  }; */

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>

      {imgUrl && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={imgUrl}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {postLikes[loggedInUserId] ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap='1.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box key={i}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment.comment}
              </Typography>
            </Box>
          ))}
          <Divider />
          <form onSubmit={handleCommentSubmit}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Write a comment...'
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton type='submit'>
                      <SendOutlined />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
