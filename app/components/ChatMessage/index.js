import React from 'react';
import Wrapper from './Wrapper';

function ChatMessage(props) {
  return (
    <Wrapper>
      <section>
        {props.item}
      </section>
    </Wrapper>
  );
}

ChatMessage.propTypes = {
  item: React.PropTypes.string,
};

export default ChatMessage;
