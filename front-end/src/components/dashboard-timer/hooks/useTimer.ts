'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDeleteTimerSession } from '@/components/dashboard-timer/hooks/queries/useDeleteTimerSession';
import { useUpdateTimerSession } from '@/components/dashboard-timer/hooks/queries/useUpdateTimerSession';
import { handleTime } from '@/components/dashboard-timer/utils/handleTime';

export function useTimer(initialSeconds: number, intervalsCount: number) {
  const totalSecondsRef = React.useRef(initialSeconds);
  const { mutate: updateSession } = useUpdateTimerSession();
  const { mutate: deleteSession } = useDeleteTimerSession();
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(
    null,
  );

  const initialTime = React.useMemo(() => handleTime(initialSeconds), []);

  const [hours, setHours] = React.useState(initialTime.hours);
  const [minutes, setMinutes] = React.useState(initialTime.minutes);
  const [seconds, setSeconds] = React.useState(initialTime.seconds);

  React.useEffect(() => {
    totalSecondsRef.current = hours * 3600 + minutes * 60 + seconds;
  }, [seconds, minutes, hours]);

  React.useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);

      incrementMinutes();
    }
  }, [seconds]);

  const handleStart = () => {
    if (!intervalId) {
      const id = setInterval(handleIteration, 1000);

      setIntervalId(id);
    }
  };

  const handleIteration = () => {
    setSeconds((prevSeconds) => prevSeconds + 1);
  };

  function incrementMinutes() {
    if (minutes === 59) {
      setMinutes(0);

      incrementHours();
    } else {
      setMinutes((prevMinutes) => prevMinutes + 1);
    }
  }

  function incrementHours() {
    setHours((prev) => {
      const next = prev + 1;

      if (next >= intervalsCount && intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);

        updateSession({
          isCompleted: true,
          totalSeconds: intervalsCount * 3600,
        });
      }

      return next;
    });
  }

  const handleReset = () => {
    if (intervalId) {
      clearInterval(intervalId);

      setIntervalId(null);
    }

    deleteSession();
  };

  const handlePause = () => {
    if (intervalId) {
      clearInterval(intervalId);

      setIntervalId(null);
    }

    updateSession({
      isCompleted: false,
      totalSeconds: totalSecondsRef.current,
    });
  };

  React.useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return {
    seconds,
    minutes,
    hours,
    intervalId,
    handleStart,
    handleReset,
    handlePause,
  };
}
