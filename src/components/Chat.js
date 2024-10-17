import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, List, ListItem, Typography } from '@mui/material';


const Chat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  // const fetchMessages = async () => {
  //   const { data } = await axios.get(`/api/chat/getMessages/${userId}/${receiverId}`);
  //   setMessages(data);
  // };

  const [loading, setLoading] = useState(true);
  // Function to fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/messages'); // Adjust the URL based on your proxy setup
      setMessages(response.data); // Set the fetched messages in state
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false); // Set loading to false after the fetch completes
    }
  };

  const sendMessage = async () => {
    await axios.post('/api/chat/sendMessage', { senderId: userId, receiverId, message });
    setMessage('');
    fetchMessages();
  };

  // useEffect to fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div>
     <div>
       <h1>Chat Messages</h1>
        {loading && <p>Loading messages...</p>} {/* Show loading indicator */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {messages.map((message) => (
            <li key={message._id}>{message.text}</li> // Assuming each message has an `_id` and `text` property
          ))}
        </ul>
      </div>
      <Box>
        <List>
          {messages.map((msg) => (
            <ListItem key={msg._id}>
              <Typography>{msg.decryptedMessage}</Typography>
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={sendMessage}>Send</Button>
      </Box>
    </div>
  );
};

export default Chat;
