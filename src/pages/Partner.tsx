import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Briefcase,
  Store,
  CheckCircle2,
  AlertCircle,
  Upload,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Send,
} from 'lucide-react';
import { useAnalyticsStore } from '../store/analyticsStore';
import { useUiStore } from '../store/uiStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Partner: React.FC = () => {
  const location = useLocation();
  const logEvent = useAnalyticsStore((state) => state.logEvent);
  const addToast = useUiStore((state) => state.addToast);

  // Tab: 'sponsors' or 'vendors'
  const [activeTab, setActiveTab] = useState<'sponsors' | 'vendors'>('vendors');

  // Sponsorship Inquiry Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('Official Pavilion Partner');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Vendor Stepper Form State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmittingVendor, setIsSubmittingVendor] = useState(false);
  const [vendorSuccessRef, setVendorSuccessRef] = useState<string | null>(null);
  const [vendorFormError, setVendorFormError] = useState<string | null>(null);

  // Form Fields
  const [vendorData, setVendorData] = useState({
    businessName: 'Oaxacan Heritage Bites LLC',
    ownerName: 'Elena Ramos',
    email: 'elena@oaxacanbites.com',
    phone: '312-555-8291',
    instagram: '@oaxacanbites',
    cuisine: 'Oaxacan / Mexican',
    signatureDish: 'Smoked Mole Negro Tacos',
    dishPrice: '$8.00',
    boothType: '10x10 Canopy Tent',
    powerNeeds: '20 Amps 110V',
    hasInsurance: true,
  });

  // Simulated upload state
  const [uploadedFile, setUploadedFile] = useState<string | null>('Oaxacan_Bites_Menu_2027.pdf');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.hash === '#sponsor') {
      setActiveTab('sponsors');
    }
    logEvent('page_view', {
      page_title: 'Partner With Us · Food Fest Chicago 2027',
      page_path: '/partner',
    });
  }, [location, logEvent]);

  const handleSimulatedFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedFile('Chicago_Food_Cert_Permit_2027.pdf');
      addToast({
        title: 'Document Uploaded',
        message: 'Health permit attached successfully.',
        type: 'success',
      });
    }, 700);
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingVendor(true);
    setVendorFormError(null);

    // Simulate 1.2s API processing
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Simulated error check per PRD §11.4: if email contains "fail"
    if (vendorData.email.toLowerCase().includes('fail')) {
      setIsSubmittingVendor(false);
      setVendorFormError('Server validation failed: This email is flagged for test rejection. Use any standard email to succeed.');
      return;
    }

    setIsSubmittingVendor(false);
    const refCode = 'FFC-V-20418';
    setVendorSuccessRef(refCode);

    logEvent('vendor_application_submit', {
      business_name: vendorData.businessName,
      cuisine: vendorData.cuisine,
      reference: refCode,
    });

    addToast({
      title: 'Application Submitted!',
      message: `Reference: ${refCode}. Culinary board review initiated.`,
      type: 'success',
    });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setInquirySubmitting(false);
    setInquirySubmitted(true);
    addToast({
      title: 'Inquiry Received',
      message: 'Our corporate partnerships team will follow up within 24 hours.',
      type: 'success',
    });
  };

  return (
    <main className="w-full bg-[var(--bg)] min-h-screen pt-20">
      {/* Header */}
      <section className="bg-[#1D1A17] text-[#F7F2E9] py-16 sm:py-20 border-b border-[#4A433B]/50 text-center">
        <div className="container-custom max-w-4xl">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9A441] mb-2 block">
            PARTNER & INTAKE PORTAL
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
            Bring your brand to the lakefront.
          </h1>
          <p className="text-base sm:text-lg text-[#E4DCCF]/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Join 60+ premier culinary operators or connect your brand with 24,000+ enthusiastic, affluent food and music lovers.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex bg-[#2C2723] p-1.5 rounded-full border border-[#4A433B]">
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'vendors'
                  ? 'bg-[#B9502F] text-white shadow-sm'
                  : 'text-[#E4DCCF]/70 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vendor Application (Chefs & Trucks)</span>
            </button>
            <button
              onClick={() => setActiveTab('sponsors')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'sponsors'
                  ? 'bg-[#B9502F] text-white shadow-sm'
                  : 'text-[#E4DCCF]/70 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Brand Sponsorship Packages</span>
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: VENDOR APPLICATION */}
      {activeTab === 'vendors' && (
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Requirements & Timeline */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
                  <h3 className="font-display text-xl font-bold text-[#1D1A17] mb-2">
                    Vendor Requirements
                  </h3>
                  <p className="text-xs text-[#80766A] mb-4 leading-relaxed">
                    Please ensure your culinary business meets the festival baseline standards before applying.
                  </p>

                  <ul className="flex flex-col gap-3 text-xs text-[#4A433B]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3F7D58] shrink-0 mt-0.5" />
                      <span>Valid City of Chicago Special Event Food Sanitation License.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3F7D58] shrink-0 mt-0.5" />
                      <span>General Liability Insurance ($1M occurrence / $2M aggregate).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3F7D58] shrink-0 mt-0.5" />
                      <span>Ability to provide 1–2 tasting portion items ($4–$10).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3F7D58] shrink-0 mt-0.5" />
                      <span>100% compostable or recyclable guest service wares.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-[var(--r-md)] bg-[#FAF7F0] border border-[#E4DCCF]">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#B9502F] mb-2">
                    Key Intake Dates
                  </h4>
                  <div className="flex flex-col gap-3 text-xs text-[#4A433B]">
                    <div>
                      <span className="font-bold text-[#1D1A17]">October 31, 2026:</span>
                      <p className="text-[#80766A]">Culinary applications close.</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#1D1A17]">November 20, 2026:</span>
                      <p className="text-[#80766A]">Selection committee notifications.</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#1D1A17]">June 11, 2027:</span>
                      <p className="text-[#80766A]">Onsite setup & refrigeration load-in.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Multi-Step Application Form */}
              <div className="lg:col-span-8">
                {vendorSuccessRef ? (
                  /* Success State */
                  <div className="p-8 sm:p-12 rounded-[var(--r-lg)] bg-white border border-[#E4DCCF] shadow-sm text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#3F7D58] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <span className="text-xs uppercase font-bold tracking-widest text-[#3F7D58]">
                      APPLICATION RECEIVED
                    </span>
                    <h2 className="font-display text-3xl font-bold text-[#1D1A17] mt-1 mb-2">
                      Thank You, {vendorData.ownerName}
                    </h2>
                    <p className="text-sm text-[#80766A] max-w-md mx-auto mb-6">
                      Your application for <strong>{vendorData.businessName}</strong> has been logged into our curation pipeline.
                    </p>

                    <div className="p-4 rounded-[var(--r-md)] bg-[#FAF7F0] border border-[#E4DCCF] max-w-xs mx-auto mb-8 font-mono text-sm">
                      <span className="text-xs text-[#80766A] block">Reference Number:</span>
                      <span className="font-bold text-[#B9502F] text-lg">{vendorSuccessRef}</span>
                    </div>

                    {/* Timeline */}
                    <div className="max-w-md mx-auto text-left border-t border-[#E4DCCF] pt-6 mb-8">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-[#1D1A17] mb-3">
                        What Happens Next:
                      </h4>
                      <ol className="flex flex-col gap-3 text-xs text-[#4A433B]">
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-[#B9502F]">1.</span>
                          <span>Our culinary board reviews menu originality and regional authenticity (10 business days).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-[#B9502F]">2.</span>
                          <span>Selected finalists are invited to an informal tasting session in Chicago.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-[#B9502F]">3.</span>
                          <span>Booth contracts, power assignments, and RFID wristband terminal configs are finalized.</span>
                        </li>
                      </ol>
                    </div>

                    <Button
                      size="md"
                      variant="secondary"
                      onClick={() => {
                        setVendorSuccessRef(null);
                        setStep(1);
                      }}
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  /* Multi-step Form */
                  <div className="bg-white rounded-[var(--r-lg)] border border-[#E4DCCF] shadow-sm overflow-hidden">
                    {/* Stepper Progress Bar */}
                    <div className="p-6 bg-[#FAF7F0] border-b border-[#E4DCCF] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#B9502F]">
                          Step {step} of 4
                        </span>
                        <h3 className="font-display text-xl font-bold text-[#1D1A17] leading-tight">
                          {step === 1 && 'Business & Operator Info'}
                          {step === 2 && 'Cuisine & Proposed Dishes'}
                          {step === 3 && 'Logistics & Power Requirements'}
                          {step === 4 && 'Final Review & Agreement'}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4].map((s) => (
                          <span
                            key={s}
                            className={`h-2 rounded-full transition-all ${
                              s === step
                                ? 'w-6 bg-[#B9502F]'
                                : s < step
                                ? 'w-2 bg-[#2F5D62]'
                                : 'w-2 bg-[#E4DCCF]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {vendorFormError && (
                      <div className="m-6 p-4 rounded-[var(--r-sm)] bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{vendorFormError}</span>
                      </div>
                    )}

                    <form onSubmit={handleVendorSubmit} className="p-6 flex flex-col gap-5">
                      {/* Step 1 */}
                      {step === 1 && (
                        <div className="flex flex-col gap-4">
                          <Input
                            label="Legal Business / Restaurant Name"
                            value={vendorData.businessName}
                            onChange={(e) => setVendorData({ ...vendorData, businessName: e.target.value })}
                            required
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                              label="Primary Contact / Chef Name"
                              value={vendorData.ownerName}
                              onChange={(e) => setVendorData({ ...vendorData, ownerName: e.target.value })}
                              required
                            />
                            <Input
                              label="Business Email"
                              type="email"
                              value={vendorData.email}
                              onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
                              required
                              hint="Hint: contains 'fail' triggers simulated error"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                              label="Phone Number"
                              type="tel"
                              value={vendorData.phone}
                              onChange={(e) => setVendorData({ ...vendorData, phone: e.target.value })}
                              required
                            />
                            <Input
                              label="Instagram / Website Handle"
                              value={vendorData.instagram}
                              onChange={(e) => setVendorData({ ...vendorData, instagram: e.target.value })}
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 2 */}
                      {step === 2 && (
                        <div className="flex flex-col gap-4">
                          <Input
                            label="Culinary Style & Regional Origin"
                            value={vendorData.cuisine}
                            onChange={(e) => setVendorData({ ...vendorData, cuisine: e.target.value })}
                            placeholder="e.g. Oaxacan Street Food, Neapolitan Wood-Fired"
                            required
                          />

                          <Input
                            label="Primary Signature Dish"
                            value={vendorData.signatureDish}
                            onChange={(e) => setVendorData({ ...vendorData, signatureDish: e.target.value })}
                            placeholder="e.g. Slow Braised Mole Negro Tacos"
                            required
                          />

                          <Input
                            label="Target Tasting Portion Price"
                            value={vendorData.dishPrice}
                            onChange={(e) => setVendorData({ ...vendorData, dishPrice: e.target.value })}
                            placeholder="$6.00 – $10.00"
                            required
                          />
                        </div>
                      )}

                      {/* Step 3 */}
                      {step === 3 && (
                        <div className="flex flex-col gap-4">
                          <div>
                            <label className="text-xs uppercase font-bold tracking-wider text-[#4A433B] mb-2 block">
                              Booth Setup Type
                            </label>
                            <select
                              value={vendorData.boothType}
                              onChange={(e) => setVendorData({ ...vendorData, boothType: e.target.value })}
                              className="w-full h-11 px-3.5 text-sm bg-white border border-[#E4DCCF] rounded-[var(--r-sm)] text-[#1D1A17] focus:ring-2 focus:ring-[#2F5D62]"
                            >
                              <option>10x10 Canopy Tent (Provided by Festival)</option>
                              <option>10x20 Double Tent</option>
                              <option>Self-Contained Food Truck</option>
                              <option>Vintage Food Trailer</option>
                            </select>
                          </div>

                          <Input
                            label="Electrical & Refrigeration Power Needs"
                            value={vendorData.powerNeeds}
                            onChange={(e) => setVendorData({ ...vendorData, powerNeeds: e.target.value })}
                            hint="e.g. 20A 110V for induction, or 50A 220V"
                          />

                          {/* Simulated File Upload */}
                          <div>
                            <label className="text-xs uppercase font-bold tracking-wider text-[#4A433B] mb-2 block">
                              Menu / Food Handler Certification (PDF)
                            </label>
                            <div className="p-4 rounded-[var(--r-sm)] border-2 border-dashed border-[#E4DCCF] bg-[#FAF7F0] flex flex-col items-center justify-center text-center">
                              {uploadedFile ? (
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#3F7D58]">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>{uploadedFile}</span>
                                </div>
                              ) : (
                                <p className="text-xs text-[#80766A]">No document attached yet.</p>
                              )}

                              <button
                                type="button"
                                onClick={handleSimulatedFileUpload}
                                disabled={isUploading}
                                className="mt-3 text-xs font-semibold text-[#2F5D62] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>{isUploading ? 'Uploading...' : 'Attach Sample Menu PDF'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 4 */}
                      {step === 4 && (
                        <div className="flex flex-col gap-4 text-xs">
                          <div className="p-4 rounded-[var(--r-sm)] bg-[#FAF7F0] border border-[#E4DCCF] flex flex-col gap-2">
                            <h4 className="font-bold text-[#1D1A17] text-sm mb-1">
                              Review Application Summary
                            </h4>
                            <p><strong>Business:</strong> {vendorData.businessName}</p>
                            <p><strong>Operator:</strong> {vendorData.ownerName} ({vendorData.email})</p>
                            <p><strong>Cuisine:</strong> {vendorData.cuisine}</p>
                            <p><strong>Featured Dish:</strong> {vendorData.signatureDish} ({vendorData.dishPrice})</p>
                            <p><strong>Setup:</strong> {vendorData.boothType}</p>
                          </div>

                          <label className="flex items-start gap-2.5 p-3 rounded-[var(--r-sm)] bg-white border border-[#E4DCCF] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={vendorData.hasInsurance}
                              onChange={(e) => setVendorData({ ...vendorData, hasInsurance: e.target.checked })}
                              className="mt-0.5 w-4 h-4 text-[#B9502F]"
                              required
                            />
                            <span className="text-[#4A433B] leading-relaxed">
                              I certify that our business has, or will obtain prior to May 1, 2027, required City of Chicago health permits and liability coverage.
                            </span>
                          </label>
                        </div>
                      )}

                      {/* Form Navigation Buttons */}
                      <div className="pt-4 border-t border-[#E4DCCF] flex items-center justify-between">
                        {step > 1 ? (
                          <Button
                            type="button"
                            size="md"
                            variant="outline"
                            onClick={() => setStep((step - 1) as any)}
                            leftIcon={<ArrowLeft className="w-4 h-4" />}
                          >
                            Previous
                          </Button>
                        ) : (
                          <div />
                        )}

                        {step < 4 ? (
                          <Button
                            type="button"
                            size="md"
                            variant="primary"
                            onClick={() => setStep((step + 1) as any)}
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                          >
                            Continue to Step {step + 1}
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            size="md"
                            variant="primary"
                            isLoading={isSubmittingVendor}
                            leftIcon={<Send className="w-4 h-4" />}
                          >
                            Submit Vendor Application
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: SPONSORSHIP PACKAGES */}
      {activeTab === 'sponsors' && (
        <section className="py-20">
          <div className="container-custom">
            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 text-center">
              <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
                <div className="font-display text-4xl font-bold text-[#B9502F] mb-1">24,000+</div>
                <h4 className="text-xs font-semibold text-[#1D1A17] uppercase tracking-wider">
                  Weekend Foot Traffic
                </h4>
                <p className="text-xs text-[#80766A] mt-1">High-spending Midwest food & travel enthusiasts</p>
              </div>

              <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
                <div className="font-display text-4xl font-bold text-[#2F5D62] mb-1">68%</div>
                <h4 className="text-xs font-semibold text-[#1D1A17] uppercase tracking-wider">
                  Ages 25–45 Demographic
                </h4>
                <p className="text-xs text-[#80766A] mt-1">Urban professionals, creatives, and couples</p>
              </div>

              <div className="p-6 rounded-[var(--r-md)] bg-white border border-[#E4DCCF]">
                <div className="font-display text-4xl font-bold text-[#D9A441] mb-1">18M+</div>
                <h4 className="text-xs font-semibold text-[#1D1A17] uppercase tracking-wider">
                  Social & PR Impressions
                </h4>
                <p className="text-xs text-[#80766A] mt-1">Influencer partnerships and Chicago media campaign</p>
              </div>
            </div>

            {/* 3 Packages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: 'Presenting Lakefront Partner',
                  price: '$45,000',
                  badge: 'Title Placement (1 Spot)',
                  isFeatured: true,
                  perks: [
                    'Co-branding: "Food Fest presented by [Your Brand]"',
                    'Main Stage naming rights & custom 40x40 brand footprint',
                    '50 VIP Weekend Passes & dedicated hospitality cabana',
                    'Logo on all 24,000 RFID wristbands & digital tickets',
                    'Dedicated press release feature and national PR inclusion',
                  ],
                },
                {
                  title: 'Official Pavilion Partner',
                  price: '$20,000',
                  badge: 'Pavilion Naming (3 Spots)',
                  isFeatured: false,
                  perks: [
                    'Naming rights to Global Tasting Pavilion or Lakeside Stage',
                    '20x20 experiential activation space with product sampling',
                    '20 VIP Weekend Passes with lounge access',
                    'Featured placement on festival map & social campaign',
                    'Dedicated digital app push notification to attendees',
                  ],
                },
                {
                  title: 'Community Artisan Partner',
                  price: '$6,500',
                  badge: 'Emerging Brands (8 Spots)',
                  isFeatured: false,
                  perks: [
                    '10x10 turn-key experiential tent in North Promenade',
                    'Brand inclusion on official website and partner directory',
                    '8 General Admission weekend passes',
                    'Rights to sample and sell consumer packaged goods',
                    'Festival social media mention to 45k+ followers',
                  ],
                },
              ].map((pkg) => (
                <div
                  key={pkg.title}
                  className={`rounded-[var(--r-lg)] p-8 flex flex-col justify-between transition-all ${
                    pkg.isFeatured
                      ? 'bg-[#1D1A17] text-[#F7F2E9] border-2 border-[#D9A441] shadow-xl relative'
                      : 'bg-white border border-[#E4DCCF] shadow-sm'
                  }`}
                >
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block ${
                        pkg.isFeatured
                          ? 'bg-[#D9A441] text-[#1D1A17]'
                          : 'bg-[#1D1A17]/5 text-[#4A433B]'
                      }`}
                    >
                      {pkg.badge}
                    </span>

                    <h3
                      className={`font-display text-2xl font-bold mb-2 ${
                        pkg.isFeatured ? 'text-white' : 'text-[#1D1A17]'
                      }`}
                    >
                      {pkg.title}
                    </h3>

                    <div className="font-display text-4xl font-bold mb-6">
                      {pkg.price}
                    </div>

                    <ul className="flex flex-col gap-3 mb-8">
                      {pkg.perks.map((perk, i) => (
                        <li key={i} className="text-xs flex items-start gap-2 leading-relaxed">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              pkg.isFeatured ? 'text-[#D9A441]' : 'text-[#3F7D58]'
                            }`}
                          />
                          <span className={pkg.isFeatured ? 'text-[#E4DCCF]/90' : 'text-[#4A433B]'}>
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    size="md"
                    variant={pkg.isFeatured ? 'primary' : 'secondary'}
                    onClick={() => {
                      setSelectedPackage(pkg.title);
                      setIsInquiryModalOpen(true);
                    }}
                    className="w-full text-xs font-semibold"
                  >
                    Inquire for Package
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPONSORSHIP INQUIRY MODAL */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[var(--r-lg)] border border-[#E4DCCF] max-w-md w-full p-6 shadow-2xl">
            {inquirySubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#3F7D58] mx-auto mb-3" />
                <h3 className="font-display text-2xl font-bold text-[#1D1A17]">Inquiry Dispatched</h3>
                <p className="text-xs text-[#80766A] mt-2 mb-6">
                  Thank you, {inquiryName}. Our sponsorship director will reach out to {inquiryEmail} with a customized deck.
                </p>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => {
                    setIsInquiryModalOpen(false);
                    setInquirySubmitted(false);
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                <h3 className="font-display text-xl font-bold text-[#1D1A17]">
                  Sponsorship Prospectus Request
                </h3>
                <p className="text-xs text-[#80766A]">
                  Package: <strong className="text-[#B9502F]">{selectedPackage}</strong>
                </p>

                <Input
                  label="Your Name"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  required
                />

                <Input
                  label="Company / Brand"
                  value={inquiryCompany}
                  onChange={(e) => setInquiryCompany(e.target.value)}
                  required
                />

                <Input
                  label="Work Email"
                  type="email"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  required
                />

                <div className="pt-2 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setIsInquiryModalOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    size="sm"
                    variant="primary"
                    isLoading={inquirySubmitting}
                  >
                    Send Inquiry
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
