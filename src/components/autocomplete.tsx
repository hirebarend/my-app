import React, { MutableRefObject, useEffect, useRef, useState } from "react";

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
    value: props.value,
  });

  useEffect(() => {
    if (state.isFocused && state.value.length > 3) {
      if (state.abortController) {
        state.abortController.abort();
      }

      const abortController: AbortController = new AbortController();

      new Promise((resolve: (value: Array<string>) => void, reject) => {
        let timeout: any = undefined;

        abortController.signal.addEventListener("abort", () => {
          if (timeout) {
            clearTimeout(timeout);
          }

          reject();
        });

        timeout = setTimeout(async () => {
          const items = await props.loadAsync(state.value);

          resolve(items);
        }, 500);
      })
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
  }, [props, state.value]);

  return (
    <div ref={mutableObjectRef}>
      <input
        className={`appearance-none bg-slate-50 focus:outline-none px-4 py-2 ${
          state.items.length ? "rounded-t-lg" : "rounded-lg"
        } text-black w-full`}
        onChange={(event) =>
          setState((state) => {
            return {
              ...state,
              value: event.target.value,
            };
          })
        }
        onFocus={() =>
          setState((state) => {
            return {
              ...state,
              isFocused: true,
            };
          })
        }
        placeholder="Enter your address"
        value={state.value}
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
                  value: x,
                });
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
