import { Metadata } from 'next';
import { Statistics } from '@/components/dashboard-root/Statistics';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE,
};

export default function DashboardPage() {
	return <Statistics />;
}
