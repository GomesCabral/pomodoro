import { SaveIcon } from 'lucide-react';
import { MainTemplate } from '../../assets/templates/MainTemplate';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const worktime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(worktime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showMessage.error('only numbers');
    }
    if (worktime < 1 || worktime > 99) {
      showMessage.error('Insert number between 1 and 99 for Work Time');
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      showMessage.error('Insert number between 1 and 30 for Short Break Time');
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      showMessage.error('Insert number between 1 and 60 for Long Break Time');
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        worktime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success('Settings Saved');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Settings</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Change the time for Focus, Short and Long Rest
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action='' className='form'>
          <div className='formRow'>
            <DefaultInput
              id='worktime'
              labelText='Focus'
              ref={workTimeInput}
              defaultValue={state.config.worktime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Short Break'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='lhortBreakTime'
              labelText='Long Break'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultButton icon={<SaveIcon />} aria-label='Save' title='save' />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
