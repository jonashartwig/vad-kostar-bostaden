import toastr from "toastr";

export function withCallback(callback: Function): void {
  withPromise(
    new Promise((resolve, reject) => {
      try {
        callback();
        resolve();
      } catch (_) {
        reject();
      }
    })
  );
}

export function withPromise(p: Promise<any>): void {
  toastr.options = {
    "positionClass" : "toast-top-center"
  }

  p
    .then(() => toastr.success("Yeeeey."))
    .catch(() => toastr.error("Neeeey."))
}

export default withPromise;
