import { Layout } from '@/components/dashboard-layout/Layout';

export default function DashboardLayout({ children }: React.PropsWithChildren) {
	return <Layout>{children}</Layout>;
}
