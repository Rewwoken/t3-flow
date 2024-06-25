import { Metadata } from 'next';
import { Charts } from '@/components/dashboard-charts/Charts';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Charts',
	...NO_INDEX_PAGE,
};

export default function ChartsPage() {
	return <Charts />;
}
