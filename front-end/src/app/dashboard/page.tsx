import { Metadata } from 'next';
import { Statistics } from '@/components/dashboard-root/Statistics';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return <Statistics />;
}
