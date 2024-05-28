import { Metadata } from 'next';
import { Statistics } from '@/components/Statistics';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return <Statistics />;
}
