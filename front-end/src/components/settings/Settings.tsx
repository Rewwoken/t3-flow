'use client';

import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from '@/components/settings/settings.module.css';
import * as validation from '@/components/settings/settings.validation';
import { QUERY_KEYS } from '@/constants/queryKeys.constants';
import { IUpdateSettings } from '@/types/services.types';
import { useTimerSettings } from '@/hooks/useTimerSettings';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { useUser } from '@/hooks/useUser';
import { SettingsField } from './SettingsField';

export const Settings = () => {
	const { isPending: isProfile, data: user } = useUser();
	const { isPending: isTimerSettings, data: timerSettings } =
		useTimerSettings();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUpdateSettings>({ mode: 'onChange' });

	const queryClient = useQueryClient();

	const { mutate, error } = useUpdateSettings(async () => {
		await queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.USER,
		});

		await queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.TIMER_SETTINGS,
		});

		alert('Settings successfully changed!');
	});

	const onSubmit: SubmitHandler<IUpdateSettings> = (data) => {
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
				<SettingsField
					label='Name'
					id='name-input'
					type='text'
					autoComplete='name'
					placeholder={user?.profile.name}
					defaultValue={user?.profile.name}
					message={errors.user?.name?.message}
					{...register('user.name', validation.name)}
				/>
				<SettingsField
					label='Email'
					id='email-input'
					type='email'
					autoComplete='email'
					placeholder={user?.profile.email}
					defaultValue={user?.profile.email}
					message={errors.user?.email?.message}
					{...register('user.email', validation.email)}
				/>
				<SettingsField
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
				<SettingsField
					label='Work interval'
					id='work-interval-input'
					type='number'
					autoComplete='off'
					placeholder={String(timerSettings?.workInterval)}
					defaultValue={timerSettings?.workInterval}
					message={errors.timer?.workInterval?.message}
					{...register('timer.workInterval', validation.workInterval)}
				/>
				<SettingsField
					label='Break interval'
					id='break-interval-input'
					type='number'
					autoComplete='off'
					placeholder={String(timerSettings?.breakInterval)}
					defaultValue={timerSettings?.breakInterval}
					message={errors.timer?.breakInterval?.message}
					{...register('timer.breakInterval', validation.breakInterval)}
				/>
				<SettingsField
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
