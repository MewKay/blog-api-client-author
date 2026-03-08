import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Remove dialog-polyfill and React Router transition to v7 warnings
const realWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      (typeof args[0] === "string" &&
        args[0].includes("This browser already supports <dialog>")) ||
      args[0].includes("A dialog is being shown inside a stacking context.") ||
      args[0].includes("React Router Future Flag Warning")
    )
      return;
    realWarn(...args);
  };
});

afterAll(() => {
  console.warn = realWarn;
});

afterEach(() => {
  cleanup();
});
