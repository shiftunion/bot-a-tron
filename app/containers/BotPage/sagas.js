/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS } from 'containers/App/constants';
import { CHAT_MESSAGE_ADD } from './constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import { chatMessageCompleted, chatMessageError } from './actions';
import request from 'utils/request';
import { selectUsername } from 'containers/BotPage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getReposWatcher() {
  yield fork(takeLatest, LOAD_REPOS, getRepos);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReposWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/**
 * Watches for CHAT_MESSAGE_ADD actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* addMessageWatcher() {
  yield fork(takeLatest, CHAT_MESSAGE_ADD, addChatMessage);
}

/**
 * Adds a bot message to the the chat windows
 * todo: Add a bot response as well
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

export function* chatDataProcessing() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(addMessageWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
  chatDataProcessing,
];
