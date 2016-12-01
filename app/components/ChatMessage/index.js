import React from 'react';
import MyChatWrapper from './MyChatWrapper';
import OthersChatWrapper from './OthersChatWrapper';

function ChatMessage(props) {
  if (props.chatMessage.username === props.currentUser) {
    return (
      <MyChatWrapper>
        {props.chatMessage.username}:
        {props.chatMessage.message}
      </MyChatWrapper>);
  }

  return (
    <OthersChatWrapper>
      {props.chatMessage.username}:
      {props.chatMessage.message}
    </OthersChatWrapper>);
}

ChatMessage.propTypes = {
  chatMessage: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default ChatMessage;
