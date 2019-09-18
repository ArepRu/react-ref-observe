// @flow

import * as React from "react";
import { observeResize, observeClickOutside } from "../src/observers.js";

const Observers = () => {
  const firstRef = React.useRef();
  const secondRef = React.useRef();
  const [clicks, setClicks] = React.useReducer(c => c + 1, 0);

  const firstSize = observeResize(firstRef);
  observeClickOutside([secondRef], setClicks);

  return (
    <>
      <div
        style={{
          width: "200px",
          height: "100px",
          border: "2px solid",
          padding: "20px",
          resize: "both",
          overflow: "auto"
        }}
        ref={firstRef}
      >
        width: {firstSize.width}, height: {firstSize.height}
      </div>
      <div
        style={{ width: "200px", height: "100px", backgroundColor: "gray" }}
        ref={secondRef}
      >
        Clicks outside: {clicks}
      </div>
    </>
  );
};

export default Observers;
