/**
 * Botpage selectors
 */

import { createSelector } from 'reselect';

const selectBot = () => (state) => state.get('bot');

const selectUsername = () => createSelector(
  selectBot(),
  (botState) => botState.get('username')
);

const selectChatHistory = () => createSelector(
  selectBot(),
  (botState) => botState.get('chatHistory')
);

export {
  selectBot,
  selectUsername,
  selectChatHistory,
};
