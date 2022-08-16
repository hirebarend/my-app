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
  onChange: (value: string, isSelection: boolean) => void;
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
    isFocused: false,
    items: [] as Array<string>,
  });

  useEffect(() => {
    if (state.isFocused && props.value.length > 3) {
      props
        .loadAsync(props.value)
        .then((items: Array<string>) =>
          setState((state) => {
            return {
              ...state,
              items,
            };
          })
        )
        .catch(() => {});
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
        onChange={(event) => props.onChange(event.target.value, false)}
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
                  isFocused: false,
                  items: [],
                });

                props.onChange(x, true);
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
