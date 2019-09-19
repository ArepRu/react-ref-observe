// @flow

import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";

type ObservableRef<T> = { current: React.ElementRef<T> | null };

type ObservedSize = {|
  height: number,
  width: number
|};

export const observeResize = <T: string>(
  observableRef: ObservableRef<T>,
  callback?: ObservedSize => void
) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const element = observableRef.current;

    if (element == null) {
      throw new Error("Ref is undefined");
    }

    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length !== 0) {
        const { contentRect } = entries[0];
        const currentSize = {
          width: contentRect.width,
          height: contentRect.height
        };

        setSize(currentSize);

        if (callback != null) {
          callback(currentSize);
        }
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, [observableRef]);

  return size;
};

export const observeClickOutside = <T: string>(
  observableRefs: $ReadOnlyArray<ObservableRef<T>>,
  callback: (MouseEvent | TouchEvent) => void
) => {
  React.useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (target instanceof Element) {
        const clickedOutside = observableRefs.every(
          ref => ref.current == null || !ref.current.contains(target)
        );

        if (clickedOutside) {
          callback(event);
        }
      }
    };

    document.addEventListener("touchstart", handleClick);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [observableRefs]);
};
