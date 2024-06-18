'use client';

import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateTimerSettings } from '@/components/dashboard-settings/hooks/useUpdateTimerSettings';
import s from '@/components/dashboard-settings/settings.module.css';
import * as v from '@/components/dashboard-settings/settings.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IUpdateTimerSettingsFields } from '@/types/settings.types';
import { IGetTimerSettingsResponse } from '@/types/timer.service.types';

interface ITimerFormProps {
	timerSettings: IGetTimerSettingsResponse;
}
export const TimerForm = ({ timerSettings }: ITimerFormProps) => {
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
				<FieldWrapper
					label='Work interval'
					htmlFor='work-interval-input'
					error={errors.workInterval?.message}
					className='bg-background'
				>
					<input
						id='work-interval-input'
						type='number'
						autoComplete='off'
						placeholder={String(timerSettings.workInterval)}
						{...register('workInterval', v.workInterval)}
						className={clsx(s.input, {
							'border-danger': !!errors.workInterval?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Break interval'
					htmlFor='break-interval-input'
					error={errors.breakInterval?.message}
					className='bg-background'
				>
					<input
						id='break-interval-input'
						type='number'
						autoComplete='off'
						placeholder={String(timerSettings.breakInterval)}
						{...register('breakInterval', v.breakInterval)}
						className={clsx(s.input, {
							'border-danger': !!errors.breakInterval?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Intervals count'
					htmlFor='intervals-count-input'
					error={errors.intervalsCount?.message}
					className='bg-background'
				>
					<input
						id='intervals-count-input'
						type='number'
						autoComplete='off'
						placeholder={String(timerSettings.intervalsCount)}
						{...register('intervalsCount', v.intervalsCount)}
						className={clsx(s.input, {
							'border-danger': !!errors.intervalsCount?.message,
						})}
					/>
				</FieldWrapper>
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
