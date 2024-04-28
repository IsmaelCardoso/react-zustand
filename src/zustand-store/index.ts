import { create } from "zustand";
import { PlayerState } from "./types";
import { api } from "../lib/axios";

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: false,

    load: async () => {
      set({
        isLoading: true,
      });

      const resp = await api.get("/courses/1");

      set({
        course: resp.data,
        isLoading: false,
      });
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      });
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();

      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });
      } else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          });
        }
      }
    },
  };
});
