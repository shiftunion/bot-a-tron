import expect from 'expect';
import botReducer from '../reducer';
import {
  changeUsername,
} from '../actions';
import { fromJS } from 'immutable';

describe('botReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(botReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = state.set('username', fixture);

    expect(botReducer(state, changeUsername(fixture))).toEqual(expectedResult);
  });
});
