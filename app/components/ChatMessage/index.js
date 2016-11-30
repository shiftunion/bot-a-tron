import React from 'react';
import Wrapper from './Wrapper';

function ChatMessage(props) {
  return (
    <Wrapper>
      <section>
        {props.item.username}:
        {props.item.message}
      </section>
    </Wrapper>
  );
}

ChatMessage.propTypes = {
  item: React.PropTypes.object,
};

export default ChatMessage;
