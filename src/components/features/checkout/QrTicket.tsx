import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCw, CheckCircle, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import { Order } from '../../../types';
import { generateQrMatrix } from '../../../lib/qr';
import { formatCurrency } from '../../../lib/format';

interface QrTicketProps {
  order: Order;
}

export const QrTicket: React.FC<QrTicketProps> = ({ order }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const qrMatrix = generateQrMatrix(order.qrPayload, 25);

  return (
    <div className="w-full max-w-md mx-auto perspective-1000 my-4 select-none">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-full cursor-pointer group"
      >
        {/* FRONT OF TICKET */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="w-full bg-[#1D1A17] text-[#F7F2E9] rounded-[var(--r-lg)] border border-[#D9A441]/40 shadow-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative"
        >
          {/* Subtle watermarked lake circles */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#B9502F]/15 blur-2xl pointer-events-none" />

          {/* Top Ticket Header */}
          <div className="flex items-start justify-between border-b border-[#4A433B]/60 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9A441]">
                OFFICIAL FESTIVAL ADMISSION
              </span>
              <h3 className="font-display text-2xl font-semibold text-white tracking-tight mt-0.5">
                Food Fest Chicago 2027
              </h3>
              <p className="text-xs text-[#E4DCCF]/70 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B9502F]" />
                <span>Lakefront Grounds · Chicago, IL</span>
              </p>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#D9A441]/20 border border-[#D9A441]/40 text-[#D9A441] text-xs font-bold font-mono">
              {order.tier.isVip ? 'VIP PASS' : 'GA PASS'}
            </div>
          </div>

          {/* Center: QR Code Pattern */}
          <div className="my-6 flex flex-col items-center justify-center">
            <div className="p-3.5 bg-white rounded-xl shadow-lg border border-[#E4DCCF]">
              <svg
                viewBox="0 0 25 25"
                className="w-44 h-44 sm:w-48 sm:h-48"
                shapeRendering="crispEdges"
              >
                {qrMatrix.map((row: boolean[], r: number) =>
                  row.map((filled: boolean, c: number) =>
                    filled ? (
                      <rect
                        key={`${r}-${c}`}
                        x={c}
                        y={r}
                        width="1"
                        height="1"
                        fill="#1D1A17"
                      />
                    ) : null
                  )
                )}
              </svg>
            </div>

            <span className="text-[11px] font-mono text-[#D9A441] mt-3 tracking-widest uppercase">
              {order.orderNumber}
            </span>
            <span className="text-[10px] text-[#80766A]">
              Tap ticket to view gate & wristband instructions
            </span>
          </div>

          {/* Bottom Details Grid */}
          <div className="border-t border-[#4A433B]/60 pt-4 grid grid-cols-3 gap-2 text-left">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#80766A] block">Guest</span>
              <span className="text-xs font-semibold text-white truncate block">
                {order.customer.firstName} {order.customer.lastName}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#80766A] block">Pass Type</span>
              <span className="text-xs font-semibold text-white truncate block">
                {order.tier.name} (×{order.quantity})
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#80766A] block">Date</span>
              <span className="text-xs font-semibold text-white truncate block">
                {order.selectedDate.replace(' (June 12–13)', '')}
              </span>
            </div>
          </div>
        </div>

        {/* BACK OF TICKET */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 w-full h-full bg-[#25211D] text-[#F7F2E9] rounded-[var(--r-lg)] border border-[#4A433B] shadow-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-[#4A433B] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Entry & Wristband Protocol</h4>
              </div>
              <RotateCw className="w-4 h-4 text-[#80766A] group-hover:text-white transition-colors" />
            </div>

            <ul className="flex flex-col gap-2.5 text-xs text-[#E4DCCF]/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Present this digital QR code at <strong>Gate A (Lakefront Promenade)</strong> for expedited entry.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Your physical RFID cashless wristband will be activated at the scanner kiosk.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Doors open at 11:00 AM. Same-day re-entry is permitted until 8:00 PM with wristband tap.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#D9A441] shrink-0 mt-0.5" />
                <span>Government ID required for 21+ alcohol and wine tasting zones.</span>
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-[#4A433B] text-center">
            <span className="text-[10px] text-[#80766A] uppercase tracking-wider block">Security Hash</span>
            <span className="font-mono text-xs text-[#D9A441] break-all">{order.qrPayload}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
