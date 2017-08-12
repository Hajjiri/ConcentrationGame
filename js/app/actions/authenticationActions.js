export const PERSIST_USERSTATE = "PERSIST_USERSTATE";
export const DROP_USERSTATE = "DROP_USERSTATE";

export function persistUserState(user) {
  return {
    type: PERSIST_USERSTATE,
    payload: user
  };
}

export function dropUserState() {
  return {
    type: DROP_USERSTATE
  };
}
