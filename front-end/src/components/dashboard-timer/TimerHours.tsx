import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

interface ITimerHoursProps {
  intervalsCount: number;
  hours: number;
}
export const TimerHoursComponent = ({
  intervalsCount,
  hours,
}: ITimerHoursProps) => {
  const intervals = new Array(intervalsCount).fill(null);

  return (
    <Stepper
      activeStep={hours}
      className='mb-6 mt-2 flex w-full justify-between'
      orientation='horizontal'
    >
      {intervals.map((el, index) => (
        <Step
          key={index}
          className='pl-2 pr-0' // override default paddings
        >
          <StepLabel />
        </Step>
      ))}
    </Stepper>
  );
};

export const TimerHours = React.memo(TimerHoursComponent);
