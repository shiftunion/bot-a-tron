import React from 'react';
import ChatMessage from 'components/ChatMessage';
import Wrapper from './Wrapper';
import Form from './Form';
import Input from './Input';

function ChatDock(props) {
  let mainContent = (<div></div>);

  if (props.chatMessages) {
    mainContent = props.chatMessages.map((item, index) => (
      <ChatMessage chatMessage={item} currentUser={props.currentUser} key={`item-${index}`} />
    ));
  } else {
    // Otherwise render a single component
    mainContent = (<ChatMessage />);
  }

  // Put together the content of the repository
  const content = (
    <Wrapper>
      {mainContent}
      <Form onSubmit={props.newMessageSubmitFunc}>
        <label htmlFor="chatMessage">
          Chat will go here 2
          <br />
          <Input
            id="chatMessage"
            type="text"
            placeholder="chat message here"
          />
          <Input
            id="username"
            type="hidden"
            value={props.currentUser}
          />
        </label>
      </Form>
    </Wrapper>
  );

  // Render the content into a list item
  return (
    content
  );
}

ChatDock.propTypes = {
  chatMessages: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  currentUser: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]),
  newMessageSubmitFunc: React.PropTypes.func,
};

export default ChatDock;
