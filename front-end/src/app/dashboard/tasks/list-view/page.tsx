import { Metadata } from 'next';
import { TasksView } from '@/components/dashboard-tasks/TasksView';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE,
};

export default function TasksPage() {
	return <TasksView />;
}
