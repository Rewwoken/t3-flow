'use client';

import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateTimerSettings } from '@/components/dashboard-settings/hooks/useUpdateTimerSettings';
import s from '@/components/dashboard-settings/settings.module.css';
import * as v from '@/components/dashboard-settings/settings.validation';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IUpdateTimerSettingsFields } from '@/types/settings.types';

export const TimerForm = () => {
  const { mutate: updateTimerSettings, isPending } = useUpdateTimerSettings();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUpdateTimerSettingsFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IUpdateTimerSettingsFields> = (values) => {
    updateTimerSettings(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      className={s.form}
    >
      <fieldset className={s.fieldset}>
        <legend className={s.legend}>Timer settings:</legend>
        <TextField
          id='work-interval-input'
          label='Work interval'
          type='text'
          variant='outlined'
          {...register('workInterval', v.workInterval)}
          error={!!errors.workInterval?.message}
          helperText={errors.workInterval?.message}
        />
        <TextField
          id='break-interval-input'
          label='Break interval'
          type='text'
          variant='outlined'
          {...register('breakInterval', v.breakInterval)}
          error={!!errors.breakInterval?.message}
          helperText={errors.breakInterval?.message}
        />
        <TextField
          id='intervals-count-input'
          label='Intervals count'
          type='text'
          variant='outlined'
          {...register('intervalsCount', v.intervalsCount)}
          error={!!errors.intervalsCount?.message}
          helperText={errors.intervalsCount?.message}
        />
      </fieldset>
      <SubmitButton
        isValid={isValid}
        isPending={isPending}
      >
        Save
      </SubmitButton>
    </form>
  );
};
