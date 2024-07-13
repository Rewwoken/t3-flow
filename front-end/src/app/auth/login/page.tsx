import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Login',
  ...NO_INDEX_PAGE,
};

export default function LoginPage() {
  return <LoginForm />;
}
