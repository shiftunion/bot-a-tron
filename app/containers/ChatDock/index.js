import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ChatMessage from 'components/ChatMessage';
import Wrapper from './Wrapper';
import { selectChatHistory, selectUsername } from 'containers/BotPage/selectors';

export class ChatDock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let mainContent = (<div></div>);

    if (this.props.chatMessages) {
      mainContent = this.props.chatMessages.map((item, index) => (
        <ChatMessage chatMessage={item} currentUser={this.props.currentUser} key={`item-${index}`} />
      ));
    } else {
      // Otherwise render a single component
      mainContent = (<ChatMessage />);
    }

    // Put together the content of the repository
    const content = (
      <Wrapper>
        {mainContent}
      </Wrapper>
    );

    // Render the content into a list item
    return (
      content
    );
  }
}

ChatDock.propTypes = {
  chatMessages: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  currentUser: React.PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUsername(),
  chatMessages: selectChatHistory(),
});

export default connect(mapStateToProps)(ChatDock);
