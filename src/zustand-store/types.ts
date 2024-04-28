interface Lesson {
  id: number;
  title: string;
  duration: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  modules: Module[];
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  play: (moduleAndLesson: [number, number]) => void;
  next: () => void;
  load: () => Promise<void>;
}
