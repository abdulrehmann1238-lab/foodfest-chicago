import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Ticket, ArrowRight, Play, Pause, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useCheckoutStore } from '../../store/checkoutStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const openCheckout = useCheckoutStore((state) => state.openCheckout);
  const isReduced = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const tickerCountries = [
    { country: 'Oaxaca', flag: '🇲🇽', specialty: 'Mole negro tacos & blue corn' },
    { country: 'Lagos', flag: '🇳🇬', specialty: 'Spicy suya beef & smoky jollof' },
    { country: 'Seoul', flag: '🇰🇷', specialty: 'Double-crunch gochujang chicken' },
    { country: 'Naples', flag: '🇮🇹', specialty: '900° wood-fired smoked burrata pizza' },
    { country: 'Lima', flag: '🇵🇪', specialty: 'Day-boat sea bass ceviche clasico' },
    { country: 'Beirut', flag: '🇱🇧', specialty: 'Wild za’atar dome flatbread & labneh' },
    { country: 'Osaka', flag: '🇯🇵', specialty: 'Sizzling dashi takoyaki & okonomiyaki' },
    { country: 'Istanbul', flag: '🇹🇷', specialty: 'Spit-roasted spiced lamb döner' },
    { country: 'Kingston', flag: '🇯🇲', specialty: 'Pimento wood smoked jerk chicken' },
    { country: 'Bangkok', flag: '🇹🇭', specialty: 'Wok-charred noodles & mango sticky rice' },
    { country: 'Havana', flag: '🇨🇺', specialty: 'Crisp pressed mojo cubano sandwiches' },
    { country: 'Addis Ababa', flag: '🇪🇹', specialty: 'Berbere lentil stew on sourdough injera' },
  ];

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#1D1A17] text-[#F7F2E9] overflow-hidden pt-24 pb-8">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {!videoError && !isReduced ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            poster="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover scale-105"
          >
            {/* High quality royalty-free food market & culinary video */}
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-steam-and-vegetables-42702-large.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
            alt="Food Fest Chicago Street Atmosphere"
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay defined in PRD §8.1 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(29,26,23,0.65) 0%, rgba(29,26,23,0.35) 40%, rgba(29,26,23,0.85) 100%)',
          }}
        />
      </div>

      {/* Video Pause / Play Accessible Toggle Button */}
      {!videoError && !isReduced && (
        <button
          onClick={toggleVideoPlayback}
          className="absolute top-24 right-6 z-10 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-all border border-white/10 text-xs flex items-center gap-1.5 cursor-pointer"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
            {isPlaying ? 'Pause Ambient' : 'Play Ambient'}
          </span>
        </button>
      )}

      {/* Main Content Area */}
      <div className="container-custom relative z-10 flex-1 flex flex-col justify-center max-w-4xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A441]">
            CHICAGO · JUNE 12–13, 2027 · LAKEFRONT GROUNDS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-[1.04] max-w-3xl mb-6"
        >
          Every kitchen in the world. One weekend on the lake.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-[#E4DCCF]/90 font-sans max-w-2xl leading-relaxed mb-8"
        >
          60+ master chefs and street-food makers from 30 countries, three live music stages, and two full days of eating your way around the globe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          <Button
            size="lg"
            variant="primary"
            onClick={() => openCheckout()}
            leftIcon={<Ticket className="w-5 h-5" />}
            className="text-base font-semibold px-7 shadow-lg"
          >
            Get Tickets
          </Button>

          <Link to="/festival">
            <Button
              size="lg"
              variant="outline"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="text-white border-white/30 hover:border-white hover:text-white"
            >
              Explore the Festival
            </Button>
          </Link>
        </motion.div>

        {/* Social Proof Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 text-xs text-[#E4DCCF]/75 font-sans"
        >
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Early-bird tickets from <strong>$38</strong></span>
          </div>
          <span className="text-[#80766A] hidden sm:inline">·</span>
          <span>Limited to 12,000 guests per day</span>
          <span className="text-[#80766A] hidden sm:inline">·</span>
          <span className="text-[#D9A441] font-medium">100% Cashless Wristband RFID</span>
        </motion.div>
      </div>

      {/* Cuisine Passport Ticker */}
      <div className="relative z-10 w-full border-t border-b border-white/10 bg-black/40 backdrop-blur-xs py-3 overflow-hidden select-none">
        <div className="animate-ticker flex items-center gap-8">
          {[...tickerCountries, ...tickerCountries].map((item, idx) => (
            <div
              key={`${item.country}-${idx}`}
              className="group relative flex items-center gap-2 text-sm text-[#E4DCCF]/85 hover:text-[#D9A441] transition-colors cursor-pointer shrink-0"
            >
              <span>{item.flag}</span>
              <span className="font-display font-medium tracking-wide">{item.country}</span>
              <span className="text-[10px] text-[#80766A]">·</span>

              {/* Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
                <div className="bg-[#1D1A17] text-white text-[11px] font-sans px-2.5 py-1 rounded shadow-xl border border-[#D9A441]/40 whitespace-nowrap">
                  {item.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
