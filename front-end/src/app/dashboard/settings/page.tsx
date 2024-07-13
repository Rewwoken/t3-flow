import { Metadata } from 'next';
import { Settings } from '@/components/dashboard-settings/Settings';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Settings',
  ...NO_INDEX_PAGE,
};

export default function SettingsPage() {
  return <Settings />;
}
