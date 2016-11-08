/**
 * Botpage selectors
 */

import { createSelector } from 'reselect';

const selectBot = () => (state) => state.get('bot');

const selectUsername = () => createSelector(
  selectBot(),
  (botState) => botState.get('username')
);

export {
  selectBot,
  selectUsername,
};
