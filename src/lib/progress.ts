"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "aizic.progress.v1";

type Progress = Record<string, true>;

function load(): Progress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

function save(progress: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* localStorage 꽉 찼으면 무시 */
  }
}

export function pageKey(unit: string, slug: string) {
  return `${unit}/${slug}`;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(load());
    setHydrated(true);
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setProgress(load());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const markRead = useCallback((key: string) => {
    setProgress((prev) => {
      if (prev[key]) return prev;
      const next = { ...prev, [key]: true as const };
      save(next);
      return next;
    });
  }, []);

  const toggle = useCallback((key: string) => {
    setProgress((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setProgress({});
    save({});
  }, []);

  return { progress, hydrated, markRead, toggle, reset };
}
