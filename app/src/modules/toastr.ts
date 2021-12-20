import toastr from "toastr";

import {dictionary} from 'svelte-i18n';
import {get} from 'svelte/store';

export function withCallback(language: string, callback: Function): void {
  withPromise(
    language,
    new Promise<void>((resolve, reject) => {
      try {
        callback();
        resolve();
      } catch (_) {
        reject();
      }
    })
  );
}

export function withPromise(language: string, p: Promise<any>): void {
  toastr.options = {
    "positionClass" : "toast-top-center"
  }

  p
    .then(() => toastr.success(get(dictionary)[language]["success"]))
    .catch(() => toastr.error(get(dictionary)[language]["failure"]))
}

export default withPromise;
