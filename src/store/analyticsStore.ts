import { create } from 'zustand';
import { AnalyticsEvent } from '../types';

interface AnalyticsState {
  events: AnalyticsEvent[];
  logEvent: (name: AnalyticsEvent['name'], parameters: Record<string, unknown>, platform?: AnalyticsEvent['platform']) => void;
  clearEvents: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  events: [
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString(),
      name: 'page_view',
      platform: 'Both',
      parameters: { page_title: 'Home · Food Fest Chicago 2027', page_path: '/', currency: 'USD' }
    }
  ],
  logEvent: (name, parameters, platform = 'Both') => {
    const newEvent: AnalyticsEvent = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleTimeString(),
      name,
      platform,
      parameters,
    };

    // Mirror to standard window.dataLayer if present
    if (typeof window !== 'undefined') {
      const win = window as unknown as { dataLayer?: unknown[] };
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({ event: name, ...parameters });
    }

    set((state) => ({
      events: [newEvent, ...state.events].slice(0, 50), // keep latest 50 events
    }));
  },
  clearEvents: () => set({ events: [] }),
}));
