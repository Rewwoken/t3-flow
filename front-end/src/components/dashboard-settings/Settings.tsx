import { TimerForm } from '@/components/dashboard-settings/TimerForm';
import { UserForm } from '@/components/dashboard-settings/UserForm';
import s from '@/components/dashboard-settings/settings.module.css';

export const Settings = () => {
	return (
		<main className={s.main}>
			<UserForm />
			<TimerForm />
		</main>
	);
};
