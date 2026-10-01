import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Save, RotateCcw, Sparkles } from 'lucide-react';
import { useUiStore } from '../../../store/uiStore';
import { useCmsStore } from '../../../store/cmsStore';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export const EditorPanel: React.FC = () => {
  const { editingTarget, setEditingTarget, addToast } = useUiStore();
  const { vendors, updateVendor } = useCmsStore();

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    cuisine: '',
    signatureDish: '',
    photo: '',
    description: '',
    location: '',
  });

  const activeVendor =
    editingTarget?.type === 'vendor'
      ? vendors.find((v) => v.id === editingTarget.id)
      : null;

  useEffect(() => {
    if (activeVendor) {
      setFormData({
        name: activeVendor.name,
        country: activeVendor.country,
        cuisine: activeVendor.cuisine,
        signatureDish: activeVendor.signatureDish,
        photo: activeVendor.photo,
        description: activeVendor.description,
        location: activeVendor.location,
      });
    }
  }, [activeVendor]);

  if (!editingTarget || !activeVendor) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateVendor(activeVendor.id, formData);
    addToast({
      title: 'Vendor Saved!',
      message: `"${formData.name}" updated live across Home and Festival pages.`,
      type: 'success',
    });
    setEditingTarget(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[var(--z-drawer)] bg-black/40 backdrop-blur-xs flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
          className="w-full sm:w-[460px] bg-[var(--surface-elevated)] h-full shadow-2xl flex flex-col border-l border-[var(--border)]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[var(--border)] bg-[#F7F2E9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-[#2F5D62]/10 text-[#2F5D62]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-[#1D1A17]">
                  Webflow CMS Visual Editor
                </h3>
                <p className="text-[11px] text-[#80766A]">
                  Editing: {activeVendor.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEditingTarget(null)}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#4A433B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Helper Banner */}
          <div className="px-5 py-2.5 bg-[#D9A441]/15 border-b border-[#D9A441]/30 text-xs text-[#1D1A17] flex items-center gap-2">
            <span className="font-semibold">Client Proof:</span>
            <span>This simulates how easily you can edit festival lineup & booths after launch without writing code.</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-4">
            <Input
              label="Vendor Brand Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
              <Input
                label="Cuisine Type"
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                required
              />
            </div>

            <Input
              label="Signature Dish"
              value={formData.signatureDish}
              onChange={(e) => setFormData({ ...formData, signatureDish: e.target.value })}
              required
            />

            <Input
              label="Booth Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />

            <Input
              label="Food Photo URL"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              hint="Unsplash or CDN link"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-semibold tracking-wider text-[#4A433B]">
                Culinary Description / Bio
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 text-sm bg-[var(--surface-elevated)] border border-[#E4DCCF] rounded-[var(--r-sm)] text-[#1D1A17] focus:outline-none focus:ring-2 focus:ring-[#2F5D62]"
              />
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-5 border-t border-[var(--border)] bg-[#F7F2E9] flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setEditingTarget(null)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleSave}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Live Updates
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
