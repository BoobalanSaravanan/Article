import { useEffect, useRef } from 'react';
import { postEvent } from '../api/client';

export const useEventTracking = ({ page, articleId = null, sessionId }) => {
  const startTimeRef = useRef(Date.now());
  const sentDepthsRef = useRef(new Set());

  const send = async (eventType, extra = {}) => {
    const payload = {
      eventType,
      page,
      articleId,
      timestamp: new Date().toISOString(),
      scrollDepth: extra.scrollDepth || 0,
      timeOnPage: extra.timeOnPage || Math.floor((Date.now() - startTimeRef.current) / 1000),
      sessionId
    };

    try {
      await postEvent(payload);
    } catch (error) {
      console.error('Event tracking failed', error);
    }
  };

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const height = document.documentElement.scrollHeight;
      const depth = Math.min(100, Math.round((scrolled / height) * 100));

      milestones.forEach((mark) => {
        if (depth >= mark && !sentDepthsRef.current.has(mark)) {
          sentDepthsRef.current.add(mark);
          send('scroll_depth', { scrollDepth: mark });
        }
      });
    };

    const onExit = () => {
      const payload = {
        eventType: 'time_on_page',
        page,
        articleId,
        timestamp: new Date().toISOString(),
        scrollDepth: 0,
        timeOnPage: Math.floor((Date.now() - startTimeRef.current) / 1000),
        sessionId
      };

      navigator.sendBeacon(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/events`,
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );
    };

    const sixtySeconds = setTimeout(() => send('time_on_page'), 60000);

    window.addEventListener('scroll', onScroll);
    window.addEventListener('beforeunload', onExit);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') onExit();
    });

    return () => {
      clearTimeout(sixtySeconds);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeunload', onExit);
    };
  }, [articleId, page, sessionId]);

  return { send };
};
