import { describe, expect, it } from "vitest";
import { player as reducer, playerSlice, play, next } from "./index";

const initialState = playerSlice.getInitialState();

describe("player slice", () => {
  it("should be able to play", () => {
    const state = reducer(initialState, play([1, 2]));

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(2);
  });

  it("should be able to play next video automatically", () => {
    const state = reducer(initialState, next());

    expect(state.currentModuleIndex).toEqual(0);
    expect(state.currentLessonIndex).toEqual(1);
  });

  it("should be able to jump to the next module automatically", () => {
    const state = reducer(
      { ...initialState, currentModuleIndex: 0, currentLessonIndex: 5 },
      next()
    );

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(0);
  });

  it("should not update the currrent module and lesson index ih there is no next lesson available", () => {
    const state = reducer(
      { ...initialState, currentModuleIndex: 1, currentLessonIndex: 5 },
      next()
    );

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(5);
  });
});
