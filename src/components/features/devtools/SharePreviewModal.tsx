import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, Smartphone, Globe } from 'lucide-react';
import { useUiStore } from '../../../store/uiStore';
import { Button } from '../../ui/Button';

export const SharePreviewModal: React.FC = () => {
  const { isShareModalOpen, setShareModalOpen, addToast } = useUiStore();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'og' | 'message'>('og');

  if (!isShareModalOpen) return null;

  const festivalUrl = 'https://foodfestchicago.com';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(festivalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast({ title: 'Link Copied', message: 'Ready to paste into Instagram, TikTok, or WhatsApp', type: 'info' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-[var(--r-lg)] max-w-xl w-full shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-[var(--border)] bg-[#F7F2E9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#B9502F]/10 text-[#B9502F]">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-[#1D1A17]">
                  Social Media & Link Preview
                </h3>
                <p className="text-xs text-[#80766A]">
                  Open Graph metadata configured for high social conversion
                </p>
              </div>
            </div>
            <button
              onClick={() => setShareModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#4A433B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="px-5 pt-3 border-b border-[var(--border)] flex gap-4">
            <button
              onClick={() => setActiveTab('og')}
              className={`pb-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'og'
                  ? 'border-[#B9502F] text-[#B9502F]'
                  : 'border-transparent text-[#80766A] hover:text-[#1D1A17]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Facebook / Meta / Twitter Card</span>
            </button>
            <button
              onClick={() => setActiveTab('message')}
              className={`pb-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'message'
                  ? 'border-[#B9502F] text-[#B9502F]'
                  : 'border-transparent text-[#80766A] hover:text-[#1D1A17]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iMessage / Instagram DM Bubble</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 bg-[#F7F2E9]/50 flex flex-col gap-4">
            {activeTab === 'og' ? (
              /* 1200x630 Meta Card Preview */
              <div className="border border-[#E4DCCF] rounded-[var(--r-md)] overflow-hidden bg-white shadow-sm">
                <div className="relative aspect-[1200/630] bg-[#1D1A17] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&h=630&q=80"
                    alt="Food Fest Chicago 2027 Preview"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#D9A441] mb-1">
                      CHICAGO · JUNE 12–13, 2027
                    </span>
                    <h4 className="font-display text-2xl sm:text-3xl text-white font-semibold leading-tight">
                      Every kitchen in the world. One weekend on the lake.
                    </h4>
                    <p className="text-xs text-[#E4DCCF]/80 mt-1">
                      60+ chefs from 30 countries. Early-bird tickets from $38.
                    </p>
                  </div>
                </div>
                <div className="p-3.5 bg-[#FAF7F0] border-t border-[#E4DCCF]">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#80766A]">
                    foodfestchicago.com
                  </p>
                  <p className="text-xs font-semibold text-[#1D1A17] mt-0.5">
                    Food Fest Chicago 2027 · June 12–13 · Lakefront Grounds
                  </p>
                </div>
              </div>
            ) : (
              /* iMessage Preview Bubble */
              <div className="flex justify-end py-2">
                <div className="max-w-xs bg-[#007AFF] text-white p-3 rounded-2xl rounded-tr-sm shadow-md text-sm">
                  <div className="rounded-xl overflow-hidden bg-white text-[#1D1A17] mb-2 shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&h=350&q=80"
                      alt="Food Fest"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-2.5">
                      <p className="text-xs font-bold leading-snug">Food Fest Chicago 2027 · June 12–13</p>
                      <p className="text-[11px] text-[#4A433B] mt-0.5">60+ chefs from 30 countries on the lakefront!</p>
                      <p className="text-[10px] text-[#80766A] mt-1 font-mono">foodfestchicago.com</p>
                    </div>
                  </div>
                  <p className="text-xs">Hey! We have to go to this food festival in June. Grabbing tickets now!</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#80766A] font-mono">Direct Share URL:</span>
              <Button
                size="sm"
                variant="primary"
                onClick={handleCopyLink}
                leftIcon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copied ? 'Copied to Clipboard' : 'Copy Festival URL'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
