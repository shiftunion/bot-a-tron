/*
 * BotPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';
import Section from './Section';
import ChatDock from 'components/ChatDock';
import { chatMessageAdd } from './actions';
import { selectChatHistory, selectUsername } from './selectors';

export class BotPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <article>
        <Helmet
          title="Bot Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application bot page' },
          ]}
        />
        <div>
          <Section>
            <H2>
              Chat goes here
            </H2>
            <div>
              <ChatDock chatMessages={this.props.chatMessages} currentUser={this.props.currentUser} newMessageSubmitFunc={this.props.onSubmitChatMessage} />
            </div>
            <br />
          </Section>
        </div>
      </article>
    );
  }
}

BotPage.propTypes = {
  // loading: React.PropTypes.bool,
  // chatMessage: React.PropTypes.string,
  onSubmitChatMessage: React.PropTypes.func,
  chatMessages: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  currentUser: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitChatMessage: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault(); // prevents the default page refresh for a form submit
      const textInput = evt.target.chatMessage;
      dispatch(chatMessageAdd(textInput.value, evt.target.username.value));
      textInput.value = '';
    },
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectUsername(),
  chatMessages: selectChatHistory(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(BotPage);
