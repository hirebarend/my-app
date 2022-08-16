import React, { MutableRefObject, useEffect, useRef, useState } from "react";

function createDelayedPromise<T>(
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
      fn().then(resolve).catch(reject);
    }, milliseconds);
  });
}

function useOutsideAlerter(
  mutableObjectRef: MutableRefObject<any>,
  fn: () => void
) {
  useEffect(() => {
    function handleMouseEvent(event: Event) {
      if (
        mutableObjectRef.current &&
        !mutableObjectRef.current.contains(event.target)
      ) {
        fn();
      }
    }

    document.addEventListener("mousedown", handleMouseEvent);

    return () => {
      document.removeEventListener("mousedown", handleMouseEvent);
    };
  }, [mutableObjectRef, fn]);
}

export function Autocomplete(props: {
  loadAsync: (value: string) => Promise<Array<string>>;
  onChange: (value: string) => void;
  value: string;
}) {
  const mutableObjectRef = useRef(null);

  useOutsideAlerter(mutableObjectRef, () => {
    setState((state) => {
      return {
        ...state,
        items: [],
      };
    });
  });

  const [state, setState] = useState({
    abortController: null as AbortController | null,
    isFocused: false,
    items: [] as Array<string>,
  });

  useEffect(() => {
    if (state.isFocused && props.value.length > 3) {
      if (state.abortController) {
        state.abortController.abort();
      }

      const abortController: AbortController = new AbortController();

      createDelayedPromise(
        () => props.loadAsync(props.value),
        500,
        abortController
      )
        .then((items: Array<string>) =>
          setState((state) => {
            return {
              ...state,
              abortController: null,
              items,
            };
          })
        )
        .catch(() => {});

      setState((state) => {
        return {
          ...state,
          abortController,
        };
      });
    } else {
      setState((state) => {
        return {
          ...state,
          items: [],
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div ref={mutableObjectRef}>
      <input
        className={`appearance-none bg-slate-50 focus:outline-none px-4 py-2 ${
          state.items.length ? "rounded-t-lg" : "rounded-lg"
        } text-black w-full`}
        onChange={(event) => props.onChange(event.target.value)}
        onFocus={() =>
          setState((state) => {
            return {
              ...state,
              isFocused: true,
            };
          })
        }
        placeholder="Enter your address"
        value={props.value}
      />
      {state.items.length ? (
        <div className="bg-white shadow">
          {state.items.map((x) => (
            <div
              className="px-4 py-2"
              onClick={() => {
                setState({
                  abortController: null,
                  isFocused: false,
                  items: [],
                });

                props.onChange(x);
              }}
              key={x}
            >
              {x}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
