const PING = 'PING';
const PONG = 'PONG';

export const pingEpic = action$ =>
  action$.ofType(PING)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: PONG });

const isPinging = (state = false, action) => {
  switch (action.type) {
    case PING:
      return true;

    case PONG:
      return false;

    default:
      return state;
  }
};
export default isPinging;

export const requestPing = () => ({ type: PING });
