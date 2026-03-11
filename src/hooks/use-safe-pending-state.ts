"use client";

import { useEffect, useRef, useState } from "react";

export function useSafePendingState(timeoutMs = 15000) {
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startPending = () => {
    clearPendingTimer();
    setPending(true);
    timeoutRef.current = setTimeout(() => {
      setPending(false);
      timeoutRef.current = null;
    }, timeoutMs);
  };

  const stopPending = () => {
    clearPendingTimer();
    setPending(false);
  };

  useEffect(() => clearPendingTimer, []);

  return {
    pending,
    startPending,
    stopPending,
  };
}
