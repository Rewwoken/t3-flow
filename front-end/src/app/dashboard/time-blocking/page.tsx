import { Metadata } from 'next';
import { TimeBlocking } from '@/components/dashboard-time-blocking/TimeBlocking';

export const metadata: Metadata = {
  title: 'Time Blocking',
};

export default function TimeBlockingPage() {
  return <TimeBlocking />;
}
