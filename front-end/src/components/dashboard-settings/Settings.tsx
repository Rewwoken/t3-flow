'use client';

import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/hooks/useUser';
import { useTimerSettings } from '@/components/dashboard-settings/hooks/useTimerSettings';
import { useUpdateSettings } from '@/components/dashboard-settings/hooks/useUpdateSettings';
import s from '@/components/dashboard-settings/settings.module.css';
import * as validation from '@/components/dashboard-settings/settings.validation';
import { FormField } from '@/components/ui/FormField';
import { KEYS } from '@/constants/keys.constants';
import { IUpdateSettingsFields } from '@/types/settings.types';

export const Settings = () => {
	const { isPending: isProfile, data: user } = useUser();
	const { isPending: isTimerSettings, data: timerSettings } =
		useTimerSettings();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUpdateSettingsFields>({ mode: 'onChange' });

	const queryClient = useQueryClient();

	const { mutate, error } = useUpdateSettings(async () => {
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
				<FormField
					label='Name'
					id='name-input'
					type='text'
					autoComplete='name'
					placeholder={user?.name || 'Name'}
					defaultValue={user?.name || ''}
					message={errors.user?.name?.message}
					{...register('user.name', validation.name)}
				/>
				<FormField
					label='Email'
					id='email-input'
					type='email'
					autoComplete='email'
					placeholder={user?.email}
					defaultValue={user?.email}
					message={errors.user?.email?.message}
					{...register('user.email', validation.email)}
				/>
				<FormField
					label='Password'
					id='password-input'
					type='password'
					autoComplete='off'
					defaultValue=''
					placeholder='********'
					message={errors.user?.password?.message}
					{...register('user.password', validation.password)}
				/>
			</fieldset>
			<fieldset className={s.fieldset}>
				<legend className={s.legend}>Timer settings:</legend>
				<FormField
					label='Work interval'
					id='work-interval-input'
					type='number'
					autoComplete='off'
					placeholder={String(timerSettings?.workInterval)}
					defaultValue={timerSettings?.workInterval}
					message={errors.timer?.workInterval?.message}
					{...register('timer.workInterval', validation.workInterval)}
				/>
				<FormField
					label='Break interval'
					id='break-interval-input'
					type='number'
					autoComplete='off'
					placeholder={String(timerSettings?.breakInterval)}
					defaultValue={timerSettings?.breakInterval}
					message={errors.timer?.breakInterval?.message}
					{...register('timer.breakInterval', validation.breakInterval)}
				/>
				<FormField
					label='Intervals count'
					id='intervals-count-input'
					type='number'
					autoComplete='off'
					placeholder={String(timerSettings?.intervalsCount)}
					defaultValue={timerSettings?.intervalsCount}
					message={errors.timer?.intervalsCount?.message}
					{...register('timer.intervalsCount', validation.intervalsCount)}
				/>
			</fieldset>
			{message && <span className={s.message}>{message}</span>}
			<button
				type='submit'
				className={s.submit}
			>
				Update
			</button>
		</form>
	);
};
