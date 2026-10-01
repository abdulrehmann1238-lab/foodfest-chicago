import React from 'react';
import { Edit3, RotateCcw } from 'lucide-react';
import { useUiStore } from '../../../store/uiStore';
import { useCmsStore } from '../../../store/cmsStore';
import { useCheckoutStore } from '../../../store/checkoutStore';

export const EditorToggle: React.FC = () => {
  const { isEditorModeActive, toggleEditorMode, addToast } = useUiStore();
  const revertAll = useCmsStore((state) => state.revertAll);
  const isCheckoutOpen = useCheckoutStore((state) => state.isOpen);

  if (isCheckoutOpen) return null;

  const handleRevert = (e: React.MouseEvent) => {
    e.stopPropagation();
    revertAll();
    addToast({
      title: 'CMS Reverted',
      message: 'All vendor, schedule, and FAQ data restored to original seeds.',
      type: 'info',
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-[var(--z-modal)] flex items-center gap-2">
      {isEditorModeActive && (
        <button
          onClick={handleRevert}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#1D1A17] text-[#F7F2E9] border border-[#80766A]/40 shadow-xl hover:bg-[#2C2723] hover:text-[#D9A441] transition-all text-xs font-semibold cursor-pointer"
          title="Revert all changes"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Seeds</span>
        </button>
      )}

      <button
        onClick={toggleEditorMode}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-xl transition-all cursor-pointer font-sans ${
          isEditorModeActive
            ? 'bg-[#2F5D62] text-white border-teal-300 ring-2 ring-[#2F5D62]/40'
            : 'bg-[#1D1A17] text-[#F7F2E9] border-[#80766A]/40 hover:bg-[#2C2723]'
        }`}
        aria-label="Toggle CMS Editor Preview"
      >
        <Edit3 className={`w-3.5 h-3.5 ${isEditorModeActive ? 'text-teal-200' : 'text-[#D9A441]'}`} />
        <span className="text-xs font-semibold tracking-tight">
          {isEditorModeActive ? 'CMS Edit: ON' : 'Edit Mode'}
        </span>
      </button>
    </div>
  );
};
