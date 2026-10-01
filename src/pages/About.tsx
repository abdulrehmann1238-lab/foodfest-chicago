import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Download, Users, Heart, Globe, Award } from 'lucide-react';
import { useAnalyticsStore } from '../store/analyticsStore';
import { useUiStore } from '../store/uiStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const About: React.FC = () => {
  const logEvent = useAnalyticsStore((state) => state.logEvent);
  const addToast = useUiStore((state) => state.addToast);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Inquiries',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    logEvent('page_view', {
      page_title: 'About & Contact · Food Fest Chicago 2027',
      page_path: '/about',
    });
  }, [logEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast({ title: 'Missing Information', message: 'Please provide your name and email.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);

    addToast({
      title: 'Message Sent!',
      message: 'We will respond within 2 business days.',
      type: 'success',
    });
  };

  const handleDownloadPressKit = () => {
    addToast({
      title: 'Press Kit Downloaded',
      message: 'High-res photos, brand guidelines, and fact sheet downloaded.',
      type: 'success',
    });
  };

  const team = [
    {
      name: 'Marcus Vance',
      role: 'Festival Co-Founder & Culinary Director',
      bio: 'Former Michelin guide consultant and champion of Chicago neighborhood culinary collectives.',
    },
    {
      name: 'Soraya Haddad',
      role: 'Head of Global Operator Programming',
      bio: 'Over a decade producing international cultural festivals across North America and Europe.',
    },
    {
      name: 'Mateo De La Cruz',
      role: 'Director of Guest Experience & Operations',
      bio: 'Specialist in large-scale attendee logistics, queue reduction, and cashless RFID implementations.',
    },
  ];

  return (
    <main className="w-full bg-[var(--bg)] min-h-screen pt-20">
      {/* Header */}
      <section className="bg-[#1D1A17] text-[#F7F2E9] py-16 sm:py-20 border-b border-[#4A433B]/50 text-center">
        <div className="container-custom max-w-4xl">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A441] mb-2 block">
            OUR STORY & MISSION
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
            Celebrating the world's kitchens.
          </h1>
          <p className="text-base sm:text-lg text-[#E4DCCF]/80 max-w-2xl mx-auto leading-relaxed">
            Food Fest Chicago was founded on the belief that culinary heritage is the most direct, joyful bridge between cultures.
          </p>
        </div>
      </section>

      {/* STORY & VALUES */}
      <section className="py-20 border-b border-[var(--border)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mb-6">
              A table big enough for the whole world.
            </h2>
            <p className="text-base text-[#4A433B] leading-relaxed mb-4">
              Chicago is internationally renowned as an architectural powerhouse and an unrivaled food town. But for all its legendary steakhouses and deep-dish icons, the true heartbeat of the city lives in its immigrant corridors—the fragrant comales of Pilsen, the simmering broths of Chinatown, the claypots of Albany Park, and the smoky barbecue pits of the South Side.
            </p>
            <p className="text-base text-[#4A433B] leading-relaxed">
              Food Fest Chicago gathers these generational traditions onto one world-class lakefront stage alongside international guest chefs for a weekend that honors craft, roots, and pure culinary passion.
            </p>
          </div>

          {/* Three Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
              <div className="w-10 h-10 rounded-lg bg-[#B9502F]/10 text-[#B9502F] flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-2">Authenticity First</h3>
              <p className="text-xs text-[#80766A] leading-relaxed">
                Zero corporate food franchise compromises. Every single vendor is an independently owned operator vetted for cultural integrity and generational pride.
              </p>
            </div>

            <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
              <div className="w-10 h-10 rounded-lg bg-[#2F5D62]/10 text-[#2F5D62] flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-2">Fair Vendor Economics</h3>
              <p className="text-xs text-[#80766A] leading-relaxed">
                We believe festivals should uplift small businesses. Our fee structures and cashless token systems prioritize high net profits for participating kitchens.
              </p>
            </div>

            <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
              <div className="w-10 h-10 rounded-lg bg-[#D9A441]/20 text-[#1D1A17] flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-2">Zero-Waste Goal</h3>
              <p className="text-xs text-[#80766A] leading-relaxed">
                Committed to a clean Lake Michigan: 100% compostable serviceware, onsite sorting stations, and leftover food donation to local Chicago pantries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="py-20 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B9502F]">
              THE ORGANIZERS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-1">
              Curated by Hospitality Veterans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
                <h3 className="font-display text-xl font-bold text-[#1D1A17]">{member.name}</h3>
                <p className="text-xs text-[#B9502F] font-semibold mt-0.5 mb-3">{member.role}</p>
                <p className="text-xs text-[#4A433B] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-[var(--r-md)] bg-[#FAF7F0] border border-[#E4DCCF] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-lg font-bold text-[#1D1A17]">Media & Press Kit</h4>
              <p className="text-xs text-[#80766A]">Download high-resolution festival photography, founder headshots, and media release.</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownloadPressKit}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download Press Kit (.ZIP)
            </Button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2F5D62]">
                  GET IN TOUCH
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1A17] mt-1 mb-4">
                  We’d love to hear from you.
                </h2>
                <p className="text-sm text-[#4A433B] leading-relaxed mb-8">
                  Whether you have questions about ticket tiers, accessibility accommodations, or press accreditation, our Chicago team is here to assist.
                </p>

                <div className="flex flex-col gap-4 text-xs text-[#1D1A17]">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#B9502F] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">General Inquiries:</span>
                      <span className="text-[#80766A]">hello@foodfestchicago.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-[#2F5D62] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Sponsorship & Brand Relations:</span>
                      <span className="text-[#80766A]">partners@foodfestchicago.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Festival Grounds Location:</span>
                      <span className="text-[#80766A]">Lakefront Grounds, Chicago, IL 60605</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E4DCCF] text-xs text-[#80766A]">
                Festival Dates: <strong>June 12–13, 2027</strong> · 11:00 AM – 10:00 PM Daily
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-[var(--r-lg)] border border-[#E4DCCF] shadow-sm">
              {isSuccess ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-[#3F7D58] mx-auto mb-3" />
                  <h3 className="font-display text-2xl font-bold text-[#1D1A17]">
                    Thanks, {formData.name}
                  </h3>
                  <p className="text-xs text-[#80766A] mt-2 mb-6 max-w-xs mx-auto">
                    Your note has been delivered. We reply to all inquiries within two business days.
                  </p>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: '', email: '', topic: 'General Inquiries', message: '' });
                    }}
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-1">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold tracking-wider text-[#4A433B] mb-2 block">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#E4DCCF] rounded-[var(--r-sm)] text-[#1D1A17] focus:ring-2 focus:ring-[#2F5D62]"
                    >
                      <option>General Inquiries</option>
                      <option>Ticketing & Wristband Support</option>
                      <option>Accessibility & Special Accommodations</option>
                      <option>Media, Press & Photography Passes</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-[#4A433B]">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist with your festival plans?"
                      required
                      className="w-full p-3.5 text-sm bg-white border border-[#E4DCCF] rounded-[var(--r-sm)] text-[#1D1A17] focus:outline-none focus:ring-2 focus:ring-[#2F5D62]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="md"
                    variant="primary"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-4 h-4" />}
                    className="mt-2"
                  >
                    Transmit Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
