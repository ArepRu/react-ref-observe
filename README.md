# react-ref-observe

A React hooks for observing an element resizing and clicking outside

## Usage

```
npm i react-ref-observe
```

```jsx
import * as React from "react";
import { observeResize, observeClickOutside } from "../src/observers.js";

export const Observers = () => {
  const firstRef = React.useRef();
  const secondRef = React.useRef();
  const [clicks, setClicks] = React.useReducer(c => c + 1, 0);

  const firstSize = observeResize(firstRef);
  observeClickOutside([secondRef], setClicks);

  return (
    <>
      <div ref={firstRef}>
        width: {firstSize.width}, height: {firstSize.height}
      </div>
      <div ref={secondRef}>Clicks outside: {clicks}</div>
    </>
  );
};
```

## API

### `observeResize(ref, callback)`

Observes element resizing. Uses [resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill)

- **ref** - React reference to a DOM element
- **callback** _optional_ - callback function, taking argument `{width, height}`

**Returns** an object `{width: Number, height: Number}`

### `observeClickOutside(refs, callback)`

Observes clicks outside an element

- **refs** - Array of react reference to a DOM element
- **callback** - callback function, taking click or touch event argument
