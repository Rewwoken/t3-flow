import { Step, StepContent, StepLabel, Stepper } from '@mui/material';
import React from 'react';

interface ITimeBlockStepperProps {
  step: number;
  isValid: boolean;
}
const TimeBlockStepperComponent = ({
  step,
  isValid,
}: ITimeBlockStepperProps) => (
  <div className='relative h-full'>
    <Stepper
      activeStep={step}
      orientation='vertical'
      className='absolute w-80'
    >
      <Step>
        <StepLabel>
          <h3 className='text-lg'>Choose a name</h3>
        </StepLabel>
        <StepContent>
          <p className='text-sm text-muted'>
            First, fill a name for a new time block.
            <br />
            It will be displayed on the block as a text.
          </p>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>
          <h3 className='text-lg'>Select the duration</h3>
        </StepLabel>
        <StepContent>
          <p className='text-sm text-muted'>
            Now type the duration of the new time block.
            <br />
            Keep in mind, that duration is expressed in minutes.
          </p>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>
          <h3 className='text-lg'>Pick a color</h3>
        </StepLabel>
        <StepContent>
          <p className='text-sm text-muted'>
            Lastly, pick a color for the new time block.
            <br />
            To do so, click on the colored block
            <br />
            to open the color palette
          </p>
        </StepContent>
      </Step>
      <Step active={isValid}>
        <StepLabel>
          <h3 className='text-lg'>Finish</h3>
        </StepLabel>
        <StepContent>
          <p className='text-sm text-muted'>
            All fields are filled, now you can
            <br />
            drag a new time block, or click
            <br />
            a submit button to create it
            <br />
            as the last one.
          </p>
        </StepContent>
      </Step>
    </Stepper>
  </div>
);

export const TimeBlockStepper = React.memo(TimeBlockStepperComponent);
