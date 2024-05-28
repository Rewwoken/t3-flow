import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
