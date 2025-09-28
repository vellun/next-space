"use client";

import { useRef, useEffect } from "react";

export const useInfiniteScroll = (
  onFetch: () => void,
  isLoading: boolean,
  isEnd: boolean,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || isEnd) {
      return;
    }

    const element = ref.current;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        onFetch();
      }
    }, options);

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [onFetch, isLoading, isEnd, options]);

  return ref;
};
