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

import { CHANGE_USERNAME, ADD_CHAT_MESSAGE } from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  username: '',
  chatHistory: '',
});

function botReducer(state = initialState, action) {
  const history = state.get('chatHistory'); // strange i have to put this here to make Eslint happy
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
    case ADD_CHAT_MESSAGE:
      return state.set('chatHistory', [...history, action.message]);
    default:
      return state;
  }
}

export default botReducer;
