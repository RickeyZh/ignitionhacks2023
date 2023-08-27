import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputMessage('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: inputMessage,
          max_tokens: 50, // Adjust token count as needed
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        },
        {validateStatus: false}
      );

      const botMessage = response.data.choices[0].text.trim();
      const updatedMessages = [...newMessages, { text: botMessage, sender: 'bot' }];
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
