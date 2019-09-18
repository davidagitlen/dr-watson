import React from 'react';
import './Message.css';

const Message = ({ message, isUser }) => {
  console.log('in message', message)
  return (
    <section className={isUser ? 'message' : 'message watson'}>
      <p>{message.message}</p>
    </section>
  )
}

export default Message;