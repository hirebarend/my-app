export function createAbortablePromise<T>(
  fn: () => Promise<T>,
  abortController: AbortController
): Promise<T> {
  return new Promise(async (resolve: (result: T) => void, reject) => {
    abortController.signal.addEventListener("abort", () => {
      reject(new Error("AbortError"));
    });

    const result = await fn();

    if (abortController.signal.aborted) {
      return;
    }

    resolve(result);
  });
}
