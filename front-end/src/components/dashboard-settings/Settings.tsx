'use client';

import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/hooks/useUser';
import { useTimerSettings } from '@/components/dashboard-settings/hooks/useTimerSettings';
import { useUpdateSettings } from '@/components/dashboard-settings/hooks/useUpdateSettings';
import s from '@/components/dashboard-settings/settings.module.css';
import * as validation from '@/components/dashboard-settings/settings.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { KEYS } from '@/constants/keys.constants';
import { IUpdateSettingsFields } from '@/types/settings.types';

export const Settings = () => {
	const { isPending: isProfile, data: user } = useUser();
	const { isPending: isTimerSettings, data: timerSettings } =
		useTimerSettings();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IUpdateSettingsFields>({ mode: 'onChange' });

	const queryClient = useQueryClient();

	const { mutate, error, isPending } = useUpdateSettings(async () => {
		await queryClient.invalidateQueries({
			queryKey: KEYS.GET_USER,
		});

		await queryClient.invalidateQueries({
			queryKey: KEYS.GET_TIMER_SETTINGS,
		});

		alert('Settings successfully changed!');
	});

	const onSubmit: SubmitHandler<IUpdateSettingsFields> = (data) => {
		if (!data.user.password) {
			data.user.password = undefined;
		}

		mutate(data);
	};

	const message = error?.response?.data.message;

	// TODO: add Skeleton
	if (isProfile || isTimerSettings) return 'Loading...';

	return (
		<form
			autoComplete='off'
			onSubmit={handleSubmit(onSubmit)}
			className={s.form}
		>
			<fieldset className={s.fieldset}>
				<legend className={s.legend}>User settings:</legend>
				<FieldWrapper
					label='Name'
					htmlFor='name-input'
					error={errors.user?.name?.message}
					className='bg-background'
				>
					<input
						id='name-input'
						type='text'
						autoComplete='name'
						placeholder={user?.name || 'Name'}
						defaultValue={user?.name || ''}
						{...register('user.name', validation.name)}
						className={clsx(s.input, {
							'border-danger': !!errors.user?.name?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Email'
					htmlFor='email-input'
					error={errors.user?.email?.message}
					className='bg-background'
				>
					<input
						id='email-input'
						type='email'
						autoComplete='email'
						placeholder={user?.email}
						defaultValue={user?.email}
						{...register('user.email', validation.email)}
						className={clsx(s.input, {
							'border-danger': !!errors.user?.email?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Password'
					htmlFor='password-input'
					error={errors.user?.password?.message}
					className='bg-background'
				>
					<input
						id='password-input'
						type='password'
						autoComplete='off'
						defaultValue=''
						placeholder='********'
						{...register('user.password', validation.password)}
						className={clsx(s.input, {
							'border-danger': !!errors.user?.password?.message,
						})}
					/>
				</FieldWrapper>
			</fieldset>
			<fieldset className={s.fieldset}>
				<legend className={s.legend}>Timer settings:</legend>
				<FieldWrapper
					label='Work interval'
					htmlFor='work-interval-input'
					error={errors.timer?.workInterval?.message}
					className='bg-background'
				>
					<input
						id='work-interval-input'
						type='number'
						autoComplete='off'
						placeholder={String(timerSettings?.workInterval)}
						defaultValue={timerSettings?.workInterval}
						{...register('timer.workInterval', validation.workInterval)}
						className={clsx(s.input, {
							'border-danger': !!errors.timer?.workInterval?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Break interval'
					htmlFor='break-interval-input'
					error={errors.timer?.breakInterval?.message}
					className='bg-background'
				>
					<input
						id='break-interval-input'
						type='number'
						autoComplete='off'
						placeholder={String(timerSettings?.breakInterval)}
						defaultValue={timerSettings?.breakInterval}
						{...register('timer.breakInterval', validation.breakInterval)}
						className={clsx(s.input, {
							'border-danger': !!errors.timer?.breakInterval?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Intervals count'
					htmlFor='intervals-count-input'
					error={errors.timer?.intervalsCount?.message}
					className='bg-background'
				>
					<input
						id='intervals-count-input'
						type='number'
						autoComplete='off'
						placeholder={String(timerSettings?.intervalsCount)}
						defaultValue={timerSettings?.intervalsCount}
						{...register('timer.intervalsCount', validation.intervalsCount)}
						className={clsx(s.input, {
							'border-danger': !!errors.timer?.intervalsCount?.message,
						})}
					/>
				</FieldWrapper>
			</fieldset>
			{message && <span className={s.message}>{message}</span>}
			<SubmitButton
				isValid={isValid}
				isPending={isPending}
				className='col-start-2'
			>
				Update
			</SubmitButton>
		</form>
	);
};
