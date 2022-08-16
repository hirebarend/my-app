import { createAbortablePromise } from "./create-abortable-promise";

export function createDelayedPromise<T>(
  fn: () => Promise<T>,
  milliseconds: number,
  abortController: AbortController | null = null
): Promise<T> {
  return new Promise((resolve: (value: T) => void, reject) => {
    let timeout: NodeJS.Timeout | null = null;

    if (abortController) {
      abortController.signal.addEventListener("abort", () => {
        if (timeout) {
          clearTimeout(timeout);
        }

        reject(new Error("abort"));
      });
    }

    timeout = setTimeout(() => {
      (abortController
        ? createAbortablePromise(() => fn(), abortController)
        : fn()
      )
        .then(resolve)
        .catch(reject);
    }, milliseconds);
  });
}
