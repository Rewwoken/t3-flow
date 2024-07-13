import { Metadata } from 'next';
import { Timer } from '@/components/dashboard-timer/Timer';

export const metadata: Metadata = {
  title: 'Timer',
};

export default function TimerPage() {
  return <Timer />;
}
