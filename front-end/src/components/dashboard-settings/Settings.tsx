'use client';

import { useUser } from '@/hooks/useUser';
import { useTimerSettings } from '@/components/dashboard-timer/hooks/queries/useTimerSettings';
import { TimerForm } from '@/components/dashboard-settings/TimerForm';
import { UserForm } from '@/components/dashboard-settings/UserForm';
import s from '@/components/dashboard-settings/settings.module.css';
import { Skeleton } from '@/components/ui/Skeleton';

export const Settings = () => {
	const { data: user, isPending: isUserPending } = useUser();
	const { data: timerSettings, isPending: isTimerSettingsPending } =
		useTimerSettings();

	if (isUserPending || isTimerSettingsPending || !user || !timerSettings)
		return <Skeleton />;

	return (
		<main className={s.main}>
			<UserForm user={user} />
			<TimerForm timerSettings={timerSettings} />
		</main>
	);
};
