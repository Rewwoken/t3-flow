'use client';

import { Button } from '@mui/material';
import { useCreateTimerSession } from '@/components/dashboard-timer/hooks/queries/useCreateTimerSession';
import { useTimerSession } from '@/components/dashboard-timer/hooks/queries/useTimerSession';
import { useTimerSettings } from '@/components/dashboard-timer/hooks/queries/useTimerSettings';
import { TimerDisplay } from '@/components/dashboard-timer/TimerDisplay';
import { Skeleton } from '@/components/ui/Skeleton';

// Potential improvement: turn session into a React.useState
export const Timer = () => {
  const { data: settings, isPending: isSettingsPending } = useTimerSettings();
  const { mutate: createSession } = useCreateTimerSession();
  const { data: session, isPending: isSessionPending } = useTimerSession();

  // TODO: Skeleton
  if (isSettingsPending || isSessionPending || !settings) return <Skeleton />;

  if (!session)
    return (
      <main className='flex items-center justify-center'>
        <Button
          variant='contained'
          onClick={() => createSession()}
          className='text-white'
        >
          Create session
        </Button>
      </main>
    );

  return (
    <main className='flex items-center justify-center'>
      <TimerDisplay
        settings={settings}
        session={session}
      />
    </main>
  );
};
