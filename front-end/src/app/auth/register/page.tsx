import type { Metadata } from 'next';
import { RegisterForm } from '@/components/RegisterForm';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Register',
	...NO_INDEX_PAGE,
};

export default function RegisterPage() {
	return <RegisterForm />;
}
