import type { TaskModel } from './TaskModel';

export type TaskStateModel = {
  task: TaskModel[]; //Historique, MainForm
  secondRemaining: number; //Home, CountDown, Historique, MainForm, Button
  formattedSecondRemaining: string; //Title, CountDown
  activeTask: TaskModel | null; //CountDown, Historique, MainForm, Button
  currentCycle: number; //1 to 8 - Home
  config: {
    worktime: number; //MainForm
    shortBreakTime: number; //MainForm
    longBreakTime: number; //MainForm
  };
};
