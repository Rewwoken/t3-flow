import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useHandleTaskCreate } from '@/components/dashboard-tasks/board-view/task/task-create/hooks/useHandleTaskCreate';
import * as v from '@/components/dashboard-tasks/board-view/task/task-create/task-create.validation';
import { getDueDate } from '@/components/dashboard-tasks/utils/dueDate';
import { SubmitButton } from '@/components/ui/SubmitButton';
import type { ICreateTaskFields, TTaskGroupId } from '@/types/task.types';

interface ICreateTaskModalProps {
  colId: TTaskGroupId;
  handleClose: () => void;
}
export const TaskCreateForm = ({
  colId,
  handleClose,
}: ICreateTaskModalProps) => {
  const { onTaskCreate, isPending } = useHandleTaskCreate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid: isValidForm },
    control,
  } = useForm<ICreateTaskFields>({
    mode: 'onChange',
  });

  const onSubmit = (values: ICreateTaskFields) => {
    onTaskCreate(values);

    handleClose();
  };

  const defaultDueDate = getDueDate[colId];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-5 accent-accent'
      autoComplete='off'
    >
      <TextField
        id='task-name-input'
        label='Task name'
        type='text'
        autoComplete='task-name'
        variant='standard'
        size='small'
        {...register('name', v.name)}
        error={!!errors.name?.message}
        helperText={errors.name?.message}
      />
      <FormControl>
        <InputLabel id='priority-select-label'>Priority</InputLabel>
        <Select
          labelId='priority-select-label'
          id='priority-select'
          label='Priority'
          size='small'
          variant='standard'
          {...register('priority')}
          defaultValue={v.Priority.low}
        >
          <MenuItem value={v.Priority.low}>Low</MenuItem>
          <MenuItem value={v.Priority.medium}>Medium</MenuItem>
          <MenuItem value={v.Priority.high}>High</MenuItem>
        </Select>
      </FormControl>
      <Controller
        name='dueDate'
        control={control}
        defaultValue={defaultDueDate ? new Date(defaultDueDate) : null}
        render={({ field: { onChange, value, ref } }) => (
          <DateTimePicker
            label='Due date'
            inputRef={ref}
            value={value}
            onChange={(date) => onChange(date)}
            slotProps={{ textField: { size: 'small', variant: 'standard' } }}
            closeOnSelect
          />
        )}
      />
      <div className='ml-1 flex items-center gap-x-2'>
        <input
          type='checkbox'
          id='is-completed'
          {...register('isCompleted')}
        />
        <label
          htmlFor='is-completed'
          className='cursor-pointer text-sm'
        >
          Is completed?
        </label>
      </div>
      <SubmitButton
        isValid={isValidForm}
        isPending={false}
      >
        Create
      </SubmitButton>
    </form>
  );
};
