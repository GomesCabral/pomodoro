import { TrashIcon } from 'lucide-react';
import { MainTemplate } from '../../assets/templates/MainTemplate';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.task.length > 0;

  const [sortedTasksOptions, setSortedTasksOptions] =
    useState<SortTasksOptions>(() => {
      return {
        tasks: sortTasks({ tasks: state.task }),
        field: 'startDate',
        direction: 'desc',
      };
    });

  useEffect(() => {
    setSortedTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.task,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.task]);

  useEffect(() => {
    document.title = 'History - Pomodoro';
  }, []);

  useEffect(() => {
    if (!confirmClearHistory) return;
    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_TASK });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection =
      sortedTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortedTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortedTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    /* if (!confirm('Clean History')) return;
    dispatch({ type: TaskActionTypes.RESET_TASK }); */
    showMessage.dismiss();
    showMessage.confirm('close?', confirmation => {
      setConfirmClearHistory(confirmation);
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='delete'
                title='delete'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Task
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duration
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Date
                  </th>
                  <th>Status</th>
                  <th>Type</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    worktime: 'Focus',
                    shortBreakTime: 'Short Rest',
                    longBreakTime: 'Long Rest',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>No Tasks</p>
        )}
      </Container>
    </MainTemplate>
  );
}
