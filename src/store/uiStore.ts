import { create } from 'zustand';
import { Vendor } from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'error' | 'info';
}

interface UiState {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  isUnderTheHoodOpen: boolean;
  toggleUnderTheHood: () => void;
  setUnderTheHoodOpen: (open: boolean) => void;

  isEditorModeActive: boolean;
  toggleEditorMode: () => void;
  editingTarget: { type: 'vendor' | 'schedule' | 'faq'; id: string } | null;
  setEditingTarget: (target: { type: 'vendor' | 'schedule' | 'faq'; id: string } | null) => void;

  isShareModalOpen: boolean;
  setShareModalOpen: (open: boolean) => void;

  isDemoGuideVisible: boolean;
  dismissDemoGuide: () => void;

  myPlan: string[];
  togglePlanAct: (actId: string) => boolean; // returns true if added, false if removed

  selectedVendorForDrawer: Vendor | null;
  setSelectedVendorForDrawer: (vendor: Vendor | null) => void;

  simulateNetworkError: boolean;
  setSimulateNetworkError: (simulate: boolean) => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const id = 'toast-' + Date.now();
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  isUnderTheHoodOpen: false,
  toggleUnderTheHood: () => set((state) => ({ isUnderTheHoodOpen: !state.isUnderTheHoodOpen })),
  setUnderTheHoodOpen: (open) => set({ isUnderTheHoodOpen: open }),

  isEditorModeActive: false,
  toggleEditorMode: () => set((state) => ({ isEditorModeActive: !state.isEditorModeActive, editingTarget: null })),
  editingTarget: null,
  setEditingTarget: (target) => set({ editingTarget: target }),

  isShareModalOpen: false,
  setShareModalOpen: (open) => set({ isShareModalOpen: open }),

  isDemoGuideVisible: true,
  dismissDemoGuide: () => set({ isDemoGuideVisible: false }),

  myPlan: ['sat-4', 'sun-4'], // pre-seed with the two headliners
  togglePlanAct: (actId) => {
    const current = get().myPlan;
    const exists = current.includes(actId);
    if (exists) {
      set({ myPlan: current.filter((id) => id !== actId) });
      return false;
    } else {
      set({ myPlan: [...current, actId] });
      return true;
    }
  },

  selectedVendorForDrawer: null,
  setSelectedVendorForDrawer: (vendor) => set({ selectedVendorForDrawer: vendor }),

  simulateNetworkError: false,
  setSimulateNetworkError: (simulate) => set({ simulateNetworkError: simulate }),
}));
