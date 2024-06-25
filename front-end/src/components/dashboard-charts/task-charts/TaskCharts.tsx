import s from '@/components/dashboard-charts/charts.module.css';
import { TaskDays } from '@/components/dashboard-charts/task-charts/TaskDays';
import { TaskGroups } from '@/components/dashboard-charts/task-charts/TaskGroups';
import { TaskPriorities } from '@/components/dashboard-charts/task-charts/TaskPriorities';

export const TaskCharts = () => (
	<section className={s.container}>
		<TaskGroups />
		<TaskPriorities />
		{/* <TaskCompleted /> */}
		<TaskDays />
	</section>
);
