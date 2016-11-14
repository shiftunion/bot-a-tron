import React from 'react';
import { FormattedMessage } from 'react-intl';
import Wrapper from './Wrapper';
import messages from './messages';

function ChatMessage() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage
          {...messages.chatMessage}
          values={{
            message: 'message-moo',
          }}
        />
      </section>
    </Wrapper>
  );
}

export default ChatMessage;
