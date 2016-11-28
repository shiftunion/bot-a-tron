/*
 * BotConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'boilerplate/Bot/CHANGE_USERNAME';

export const CHAT_MESSAGE_ADD = 'boilerplate/Bot/CHAT_MESSAGE_ADD';
export const CHAT_MESSAGE_SUCCESS = 'boilerplate/Bot/CHAT_MESSAGE_SUCCESS';
export const CHAT_MESSAGE_ERROR = 'boilerplate/Bot/CHAT_MESSAGE_ERROR';
