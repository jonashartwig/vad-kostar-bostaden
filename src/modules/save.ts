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

export function saveAsFile(state: State): void {
  const serializedString = state.serializeToString(),
    blob = new Blob([serializedString], { type : "application/json" }),
    url = window.URL.createObjectURL(blob),
    a = document.createElement('a');

    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = 'state.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
