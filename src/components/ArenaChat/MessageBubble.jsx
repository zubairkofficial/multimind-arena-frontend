import React from "react";
import styled from "styled-components";

function MessageBubble({ message }) {
  const isSender = message.sender === "You";

  return (
    <BubbleWrapper isSender={isSender}>
      <MessageContent isSender={isSender}>
        {!isSender && (
          <SenderName>
            <strong>{message.sender ?? "Default"}</strong>
          </SenderName>
        )}
        <MessageText>{message?.content ?? message?.message?.content}</MessageText>
        <TimeStamp isSender={isSender}>{message.time}</TimeStamp>
      </MessageContent>
    </BubbleWrapper>
  );
}

const BubbleWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.isSender ? 'flex-end' : 'flex-start'};
  margin-bottom: 1rem;
  padding: 0 1rem;
  max-width: 85%;
  margin-left: ${props => props.isSender ? 'auto' : '0'};
`;

const MessageContent = styled.div`
  background: ${props => props.isSender ? 
    'linear-gradient(145deg, #222222, #1a1a1a)' : 
    'linear-gradient(145deg, #003300, #002200)'};
  padding: 1rem;
  border-radius: ${props => props.isSender ? 
    '20px 20px 0 20px' : 
    '20px 20px 20px 0'};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  position: relative;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SenderName = styled.div`
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #17df14;
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #ffffff;
  word-wrap: break-word;
`;

const TimeStamp = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.5rem;
  text-align: ${props => props.isSender ? 'right' : 'left'};
`;

export default MessageBubble;
