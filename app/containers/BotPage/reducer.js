/*
 * BotReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { CHANGE_USERNAME, CHAT_MESSAGE_ADD, CHAT_MESSAGE_SUCCESS, CHAT_MESSAGE_ERROR } from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  username: '',
  chatHistory: [],
  loading: false,
});

function botReducer(state = initialState, action) {
  const history = state.get('chatHistory'); // strange i have to put this here to make Eslint happy
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
    case CHAT_MESSAGE_ADD:
      return state
        .set('chatHistory', [...history, action.message])
        .set('loading', true);
    case CHAT_MESSAGE_SUCCESS:
      return state
        .set('chatHistory', [...history, action.botResponse])
        .set('loading', false);
    case CHAT_MESSAGE_ERROR:
      return state.set('chatHistory', [...history, action.error]);
    default:
      return state;
  }
}

export default botReducer;
