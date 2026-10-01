import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, Trash2, ChevronDown, ChevronRight, Check, Code, ShieldCheck } from 'lucide-react';
import { useAnalyticsStore } from '../../../store/analyticsStore';
import { useUiStore } from '../../../store/uiStore';
import { useCheckoutStore } from '../../../store/checkoutStore';

export const UnderTheHood: React.FC = () => {
  const { isUnderTheHoodOpen, toggleUnderTheHood } = useUiStore();
  const { events, clearEvents } = useAnalyticsStore();
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isCheckoutOpen = useCheckoutStore((state) => state.isOpen);

  const toggleExpand = (id: string) => {
    setExpandedEventId((prev) => (prev === id ? null : id));
  };

  const copyPayload = (id: string, payload: unknown) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (isCheckoutOpen) return null;

  return (
    <>
      {/* Floating Trigger Pill (Bottom Left) */}
      <button
        onClick={toggleUnderTheHood}
        className="fixed bottom-5 left-5 z-[var(--z-modal)] flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#1D1A17] text-[#F7F2E9] border border-[#D9A441]/40 shadow-xl hover:bg-[#2C2723] hover:border-[#D9A441] transition-all cursor-pointer group"
        aria-label="Open Under the Hood analytics inspector"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <Activity className="w-4 h-4 text-[#D9A441]" />
        <span className="text-xs font-semibold tracking-tight">Under the Hood</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#3F7D58]/30 text-emerald-300 font-mono">
          {events.length}
        </span>
      </button>

      {/* Inspector Panel */}
      <AnimatePresence>
        {isUnderTheHoodOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 left-5 z-[var(--z-modal)] w-[90vw] sm:w-[420px] max-h-[75vh] flex flex-col bg-[#1D1A17] text-[#F7F2E9] border border-[#4A433B] rounded-[var(--r-lg)] shadow-2xl overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#4A433B]/60 bg-[#25211D]">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#D9A441]" />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                    Analytics & Conversion Inspector
                  </h3>
                  <p className="text-[10px] text-[#E4DCCF]/60">Live GA4 + Meta Pixel DataLayer Stream</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearEvents}
                  className="p-1.5 text-[#80766A] hover:text-white transition-colors cursor-pointer"
                  title="Clear event log"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={toggleUnderTheHood}
                  className="p-1.5 text-[#80766A] hover:text-white transition-colors cursor-pointer"
                  title="Close inspector"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-header info banner */}
            <div className="px-4 py-2 bg-[#2F5D62]/20 border-b border-[#4A433B]/40 flex items-center justify-between text-[11px] text-[#E4DCCF]/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulated Tracking: GA4 & Meta Pixel active</span>
              </div>
              <span className="font-mono text-[10px] text-[#D9A441]">Client Demo</span>
            </div>

            {/* Events List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
              {events.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#80766A]">
                  No events logged yet. Interact with the website to view live tracking.
                </div>
              ) : (
                events.map((evt) => {
                  const isExpanded = expandedEventId === evt.id;
                  const isPurchase = evt.name === 'purchase';

                  return (
                    <div
                      key={evt.id}
                      className={`border rounded-[var(--r-sm)] p-2.5 transition-colors ${
                        isPurchase
                          ? 'bg-[#3F7D58]/15 border-emerald-500/40'
                          : 'bg-[#25211D]/80 border-[#4A433B]/60 hover:border-[#80766A]'
                      }`}
                    >
                      <div
                        onClick={() => toggleExpand(evt.id)}
                        className="flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#D9A441]" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-[#80766A]" />
                          )}
                          <span
                            className={`font-mono text-xs font-semibold ${
                              isPurchase ? 'text-emerald-300' : 'text-[#D9A441]'
                            }`}
                          >
                            {evt.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#80766A] font-mono">
                            {evt.platform}
                          </span>
                          <span className="text-[10px] text-[#80766A] font-mono">{evt.timestamp}</span>
                        </div>
                      </div>

                      {/* Expandable JSON Payload */}
                      {isExpanded && (
                        <div className="mt-2 pt-2 border-t border-[#4A433B]/40">
                          <div className="flex items-center justify-between mb-1.5 text-[10px] text-[#80766A]">
                            <span>Data Payload:</span>
                            <button
                              onClick={() => copyPayload(evt.id, evt.parameters)}
                              className="flex items-center gap-1 text-[#D9A441] hover:underline cursor-pointer"
                            >
                              {copiedId === evt.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <span>Copy JSON</span>
                              )}
                            </button>
                          </div>
                          <pre className="text-[10px] font-mono bg-black/60 p-2 rounded text-[#E4DCCF]/90 overflow-x-auto leading-relaxed">
                            {JSON.stringify(evt.parameters, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer advice */}
            <div className="px-4 py-2.5 bg-[#171513] border-t border-[#4A433B]/40 text-[10px] text-[#80766A] flex justify-between items-center">
              <span>Try purchasing a ticket to watch the funnel fire.</span>
              <span className="text-[#D9A441]">PRD §11.8</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
