import { create } from 'zustand';
import { Vendor, ScheduleAct, FaqItem } from '../types';
import { INITIAL_VENDORS } from '../data/vendors';
import { SCHEDULE_ACTS } from '../data/schedule';
import { FESTIVAL_FAQS } from '../data/faqs';

interface CmsState {
  vendors: Vendor[];
  schedule: ScheduleAct[];
  faqs: FaqItem[];
  highlightedId: string | null;
  lastUpdated: string | null;
  
  updateVendor: (id: string, updates: Partial<Vendor>) => void;
  updateScheduleAct: (id: string, updates: Partial<ScheduleAct>) => void;
  updateFaq: (id: string, updates: Partial<FaqItem>) => void;
  revertAll: () => void;
  setHighlightedId: (id: string | null) => void;
}

export const useCmsStore = create<CmsState>((set) => ({
  vendors: [...INITIAL_VENDORS],
  schedule: [...SCHEDULE_ACTS],
  faqs: [...FESTIVAL_FAQS],
  highlightedId: null,
  lastUpdated: null,

  updateVendor: (id, updates) => {
    set((state) => ({
      vendors: state.vendors.map((v) => (v.id === id ? { ...v, ...updates } : v)),
      highlightedId: id,
      lastUpdated: `Vendor "${updates.name || id}" updated`,
    }));

    setTimeout(() => {
      set({ highlightedId: null });
    }, 1200);
  },

  updateScheduleAct: (id, updates) => {
    set((state) => ({
      schedule: state.schedule.map((a) => (a.id === id ? { ...a, ...updates } : a)),
      highlightedId: id,
      lastUpdated: `Act "${updates.name || id}" updated`,
    }));

    setTimeout(() => {
      set({ highlightedId: null });
    }, 1200);
  },

  updateFaq: (id, updates) => {
    set((state) => ({
      faqs: state.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f)),
      highlightedId: id,
      lastUpdated: `FAQ question updated`,
    }));

    setTimeout(() => {
      set({ highlightedId: null });
    }, 1200);
  },

  revertAll: () => {
    set({
      vendors: [...INITIAL_VENDORS],
      schedule: [...SCHEDULE_ACTS],
      faqs: [...FESTIVAL_FAQS],
      highlightedId: null,
      lastUpdated: 'All content restored to initial state',
    });
  },

  setHighlightedId: (id) => set({ highlightedId: id }),
}));
