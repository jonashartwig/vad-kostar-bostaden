import State from "../dto/state";

const localStorageKey = "__vkb_state__";

export function saveToLocalStorage(state: State): void {
  const json = state.serializeToString();

  localStorage.setItem(localStorageKey, json);
}

export function loadFromLocalStorage(): State {
  return State.deserializeFromString(localStorage.getItem(localStorageKey));
}
