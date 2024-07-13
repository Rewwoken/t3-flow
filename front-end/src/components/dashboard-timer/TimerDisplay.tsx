/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { useTimer } from '@/components/dashboard-timer/hooks/useTimer';
import { TimerHours } from '@/components/dashboard-timer/TimerHours';
import {
  IGetTimerSessionResponse,
  IGetTimerSettingsResponse,
} from '@/types/timer.service.types';

interface ITimerDisplayProps {
  settings: IGetTimerSettingsResponse;
  session: IGetTimerSessionResponse;
}
export const TimerDisplay = ({ settings, session }: ITimerDisplayProps) => {
  const {
    seconds,
    minutes,
    hours,
    intervalId,
    handleStart,
    handleReset,
    handlePause,
  } = useTimer(session.totalSeconds, settings.intervalsCount);

  const timerMessage = React.useMemo(() => {
    if (session.isCompleted) return 'Session successfully completed!';

    if (!intervalId) return 'Timer is paused';

    if (minutes < settings.workInterval) return 'Time to work!';

    return 'Time for a break!';
  }, [session, intervalId, minutes]);

  const Buttons = React.useMemo(
    () => (
      <ButtonGroup
        variant='contained'
        aria-label='Timer actions buttons'
        className='w-full'
      >
        <Button
          onClick={handleStart}
          className='w-1/3 text-white'
          disabled={!!intervalId || session.isCompleted}
        >
          Start
        </Button>
        <Button
          onClick={handleReset}
          className='w-1/3 text-white'
        >
          Reset
        </Button>
        <Button
          onClick={handlePause}
          className='w-1/3 text-white'
          disabled={!intervalId}
        >
          Pause
        </Button>
      </ButtonGroup>
    ),
    [intervalId, session],
  );

  return (
    <div className='flex flex-col items-center rounded-sm bg-secondary p-2'>
      <h2 className='text-2xl'>Let&apos;s focus!</h2>
      <span className='italic text-muted'>
        Work for {settings.workInterval} min - Break for&nbsp;
        {settings.breakInterval} min
      </span>
      <ol className='flex gap-x-2'>
        <li className='w-32 text-8xl'>
          {session.isCompleted ? '00' : String(minutes).padStart(2, '0')}
        </li>
        <li className='relative bottom-2 text-8xl'>{':'}</li>
        <li className='w-32 text-8xl'>
          {session.isCompleted ? '00' : String(seconds).padStart(2, '0')}
        </li>
      </ol>
      <span className='text-muted'>{timerMessage}</span>
      <TimerHours
        intervalsCount={settings.intervalsCount}
        hours={hours}
      />
      {Buttons}
    </div>
  );
};
