/**
 * ChatDock
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import List from 'components/List';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ChatMessage from 'components/ChatMessage';
import Wrapper from './Wrapper';
import { selectCurrentUser } from 'containers/App/selectors';
import { selectChatHistory } from 'containers/BotPage/selectors';

export class ChatDock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const mainContent = (<List items={this.props.chatMessages} component={ChatMessage} />);

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
  // currentUser: React.PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  chatMessages: selectChatHistory(),
});

export default connect(mapStateToProps)(ChatDock);
