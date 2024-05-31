import { Metadata } from 'next';
import { Settings } from '@/components/dashboard-settings/Settings';

export const metadata: Metadata = {
	title: 'Settings',
};

export default function SettingsPage() {
	return <Settings />;
}
