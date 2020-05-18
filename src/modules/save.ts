import State from "../dto/state";

const localStorageKey = "__vkb_state__";

export function saveToLocalStorage(state: State): void {
  const json = state.serializeToString();

  localStorage.setItem(localStorageKey, json);
}

export function loadFromLocalStorage(): State {
  const state = localStorage.getItem(localStorageKey);

  if(!state) {
    return new State();
  }

  return State.deserializeFromString(state);
}
