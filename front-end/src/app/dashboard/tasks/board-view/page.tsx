import { Metadata } from 'next';
import { BoardView } from '@/components/dashboard-tasks/board-view/BoardView';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	...NO_INDEX_PAGE,
};

export default function BoardViewPage() {
	return <BoardView />;
}
