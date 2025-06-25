import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    worktime: (
      <span>
        Focus for <b>{state.config.worktime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Rest for <b>{state.config.shortBreakTime}min</b>
      </span>
    ),
    longBreakTime: <span>Long break</span>,
  };

  const tipsForNoActiveTask = {
    worktime: (
      <span>
        Next cicle is <b>{state.config.worktime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Next cicle is <b>{state.config.shortBreakTime}min</b>
      </span>
    ),
    longBreakTime: <span>Next cicle is long break</span>,
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
