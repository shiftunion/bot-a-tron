/*
 * BotPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Form from './Form';
import H2 from 'components/H2';
import Input from './Input';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import Section from './Section';
import messages from './messages';
import ChatDock from 'containers/ChatDock';
import { loadRepos } from '../App/actions';
import { changeUsername, chatMessageAdd } from './actions';
import { selectRepos, selectLoading, selectError } from 'containers/App/selectors';
import { selectChatHistory, selectUsername } from './selectors';

export class BotPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repo list
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

      // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

      // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.repos !== false) {
      mainContent = (<List items={this.props.repos} component={RepoListItem} />);
    }

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
              <FormattedMessage {...messages.chatHeader} />
            </H2>
            <div>
              <ChatDock></ChatDock>
            </div>
            <br /><br /><br />
            <Form onSubmit={this.props.onSubmitChatMessage}>
              <label htmlFor="chatMessage">
                <FormattedMessage {...messages.newChatMessage} />
                <br />
                <Input
                  id="chatMessage"
                  type="text"
                  placeholder="chat message here"
                  value={this.props.chatMessage}
                />
                <Input
                  id="username"
                  type="hidden"
                  value={this.props.username}
                />
              </label>
            </Form>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.repoMessage} />
                <br />
                <Input
                  id="username"
                  type="text"
                  placeholder="shiftunion"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            {mainContent}
          </Section>
        </div>
      </article>
    );
  }
}

BotPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
  chatMessage: React.PropTypes.string,
  onSubmitChatMessage: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    onSubmitChatMessage: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault(); // prevents the default page refresh for a form submit
      const textInput = evt.target.chatMessage;
      dispatch(chatMessageAdd(textInput.value, evt.target.username.value));
      textInput.value = '';
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: selectRepos(),
  username: selectUsername(),
  loading: selectLoading(),
  error: selectError(),
  chatMessages: selectChatHistory(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(BotPage);
