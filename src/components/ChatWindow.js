import React, { useState } from 'react';
import { Box, TextField, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import api from '../api';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendClick = async () => {
    if (inputValue.trim()) {
      const outgoingMessage = { text: inputValue, author: 'You', direction: 'outgoing' };
      setMessages(prevMessages => [...prevMessages, outgoingMessage]);
  
      try {
        const inputMessage = inputValue;
        setInputValue('');
        const stream = await api.streamRequest('/process-conversation', 'POST', { message: inputMessage });
        const reader = stream.getReader();
        const decoder = new TextDecoder();
  
        reader.read().then(function processText({ done, value }) {
          if (done) {
            console.log('Stream complete');
            return;
          }
  
          const chunk = decoder.decode(value, { stream: true });
  
          // Append chunk to the last bot message if it exists
          setMessages(prevMessages => {
            let newMessages = [...prevMessages];
            if (newMessages.length > 0 && newMessages[newMessages.length - 1].author === 'Bot') {
              let lastMessage = newMessages[newMessages.length - 1];
              lastMessage.text += chunk;
              newMessages[newMessages.length - 1] = lastMessage; // Update the last message
            } else {
              // If there's no bot message yet, add a new one
              newMessages = [...newMessages, { text: chunk, author: 'Bot', direction: 'incoming' }];
            }
            return newMessages;
          });
  
          reader.read().then(processText);
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List style={{ overflow: 'auto', maxHeight: '80%', padding: '10px' }}>
        {messages.map((message, index) => (
          <ListItem key={index} style={{ alignSelf: message.direction === 'outgoing' ? 'flex-end' : 'flex-start' }}>
            <ListItemAvatar>
              <Avatar>{message.author.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={message.text} />
          </ListItem>
        ))}
      </List>
      <Box style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <IconButton onClick={handleSendClick} color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatWindow;
