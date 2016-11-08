import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectBot,
  selectUsername,
} from '../selectors';

describe('selectBot', () => {
  const botSelector = selectBot();
  it('should select the bot state', () => {
    const botState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      bot: botState,
    });
    expect(botSelector(mockedState)).toEqual(botState);
  });
});

describe('selectUsername', () => {
  const usernameSelector = selectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      bot: {
        username,
      },
    });
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});
