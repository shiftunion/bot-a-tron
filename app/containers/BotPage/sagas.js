import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CHAT_MESSAGE_ADD } from './constants';
import { repoLoadingError } from 'containers/App/actions';
import { chatMessageCompleted, chatMessageError, botApiResponded } from './actions';
import request from 'utils/request';
// import { selectUsername } from 'containers/BotPage/selectors';

/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getBotApiWatcher() {
  yield fork(takeLatest, CHAT_MESSAGE_ADD, getBotApiDetail);
}

/**
 * Github repos request/response handler
 */
export function* getBotApiDetail() {
  // Select username from store
  // const username = yield select(selectUsername());
  const requestURL = 'http://localhost:3333/cards/';

  try {
    // Call our request helper (see 'utils/request')
    const cards = yield call(request, requestURL);
    yield put(botApiResponded(cards)); // todo: call a modified version  of
  } catch (err) {
    yield put(repoLoadingError(err)); // todo: make this a botpage specific action addChatMessage
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* botApiData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getBotApiWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/** ----------------------- **/
/**
 * Watches for CHAT_MESSAGE_ADD actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* addMessageWatcher() {
  yield fork(takeLatest, CHAT_MESSAGE_ADD, addChatMessage);
}

/**
 * Adds a bot message to the the chat windows
 */
export function* addChatMessage() {
  // Select chat from store

  const botResponse = 'i hear ya fella';
  try {
    yield put(chatMessageCompleted(botResponse));
  } catch (err) {
    yield put(chatMessageError(err));
  }
}

/**
 * STEP 1
 */
export function* chatDataProcessing() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(addMessageWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  botApiData,
  chatDataProcessing, //todo: Consider... do need two or these or just one?
];
