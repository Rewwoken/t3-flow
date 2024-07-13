import { Metadata } from 'next';
import { Tasks } from '@/components/dashboard-tasks/Tasks';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  ...NO_INDEX_PAGE,
};

export default function TasksPage() {
  return <Tasks />;
}
