import State from "../dto/state";

const localStorageKey = "__vkb_state__";

export function saveToLocalStorage(state: State): void {
  const json = state.serializeToString();

  localStorage.setItem(localStorageKey, json);
}

export function loadFromLocalStorage(): State {
  const state = localStorage.getItem(localStorageKey);

  if(!state) {
    return undefined;
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
    a.download = 'vad-kostar-bostaden.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

export async function loadFromFile(files: FileList): Promise<State> {
  const file = files[0];
  if (!file) {
    return Promise.reject();
  }

  function getContent(event: ProgressEvent<FileReader>): string | ArrayBuffer {
    return event.target.result;
  }

  return await new Promise((resolve, _) => {
    const fileReader = new FileReader();

    fileReader.onload = resolve;
    fileReader.readAsText(file);
  })
    .then(getContent)
    .then(content => State.deserializeFromString(<string>content));
}

export function saveAsUrl(state: State): string {
  return "?state=" + state.serializeToBase64String()
}

export function canBeLoadedFromParam() {
  const urlSearchParams = new URLSearchParams(window.location.search)

  if(!urlSearchParams.has("state")) {
    return undefined;
  }

  return urlSearchParams.get("state");
}

export function loadFromUrl(): State {
  const state = canBeLoadedFromParam()

  if(!state) {
    return undefined;
  }

  return State.deserializeFromBase64String(state)
}
