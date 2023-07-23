import Message from '../../components/Message/Message';
import Conversations from '../../components/Conversations/Conversations';
import Navbar from '../navBar/index';
import './Styles.css';
import { Box, Button, InputBase, Typography } from '@mui/material';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { userConversations } from '../../api/conversations.api';
import { sendMessage, userMessages } from '../../api/messages.api';
import { io } from 'socket.io-client';
import { getId } from '../../api/users.api';
import { useSelector } from 'react-redux';

const Messenger = () => {
  const userId = localStorage.getItem('userId');
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const user = useSelector(state => state.user); // Access the user object directly
  const socket = useRef(io(`${import.meta.env.VITE_CHAT_URL}`));
  const scrollRef = useRef();

  //ws://localhost:8900 env. instead of the render

  useEffect(() => {
    const User = async () => {
      const response = await getId(userId);
      const currentUser = response.data;
      setUserInfo(currentUser);
    };
    User();
  }, []);

  console.log('User Info', userInfo);

  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_CHAT_URL}`);
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (userInfo) {
      socket.current.emit('addUser', userId);
      socket.current.on('getUsers', users => {
        setOnlineUsers(
          userInfo.friends.filter(f => users.some(u => u.userId === f))
        );
      });
    }
  }, [userId, userInfo]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await userConversations(userId);

        if (res) {
          setConversations(res.data);
        }
      } catch (error) {
        console.log('An error occurred while getting conversations:', error);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await userMessages(currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log('MESSENGER: error fetching messages:', error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async e => {
    e.preventDefault();

    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find(member => member !== userId);

    socket.current.emit('sendMessage', {
      senderId: userId,
      receiverId,
      text: newMessage
    });

    try {
      const res = await sendMessage(message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log('MESSENGER:error occurred sending a new message:', error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <>
      <Navbar />
      <Box className='messenger'>
        <Box className='chatMenu'>
          <Box className='chatMenuWrapper'>
            <InputBase
              placeholder='Search for friends'
              className='chatMenuInput'
            />
            {conversations &&
              conversations.map(c => (
                <Box key={c._id} onClick={() => setCurrentChat(c)}>
                  <Conversations conversation={c} currentUser={userId} />
                </Box>
              ))}
          </Box>
        </Box>
        <Box className='chatBox'>
          <Box className='chatBoxWrapper'>
            {currentChat ? (
              <>
                <Box className='chatBoxTop'>
                  {messages &&
                    messages.map((m, index) => (
                      <Box key={`${m._id}-${index}`}>
                        <Box ref={scrollRef} />
                        <Message
                          key={m._id}
                          own={m.sender === userId}
                          message={m}
                        />
                      </Box>
                    ))}
                </Box>
                <Box className='chatBoxBottom'>
                  <InputBase
                    className='chatMessageInput'
                    placeholder='Write Some Paws'
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></InputBase>
                  <Button className='chatSubmitButton' onClick={handleSubmit}>
                    Send
                  </Button>
                </Box>
              </>
            ) : (
              <Typography className='noConversationText'>
                Open a Conversation to start Chatting{' '}
              </Typography>
            )}
          </Box>
        </Box>
        <Box className='chatOnline'>
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={userId}
            setCurrentChat={setCurrentChat}
          />
        </Box>
      </Box>
    </>
  );
};

export default Messenger;
