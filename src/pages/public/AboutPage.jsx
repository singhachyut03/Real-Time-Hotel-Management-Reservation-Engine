import React from 'react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import { HOTEL_INFO, HOTEL_IMAGES } from '../../data/seedData';
import { Building2, Award, ShieldCheck, HeartHandshake, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Excellence in Luxury Hospitality</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-txt-main">
            About {HOTEL_INFO.name}
          </h1>
          <p className="text-base text-txt-secondary leading-relaxed">
            Perched along the iconic waterfront district, StayOps combines timeless architectural beauty with modern intelligent hotel operations. Every guest journey is tailored with precision, warm hospitality, and effortless elegance.
          </p>
        </div>

        {/* Gallery Collage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden border border-border-dark h-64 bg-bg-secondary">
            <img src={HOTEL_IMAGES.exterior} alt="Exterior" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden border border-border-dark h-64 bg-bg-secondary">
            <img src={HOTEL_IMAGES.lobby} alt="Grand Lobby" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden border border-border-dark h-64 bg-bg-secondary">
            <img src={HOTEL_IMAGES.restaurant} alt="Fine Dining" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-bg-card border border-border-dark space-y-3">
            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-txt-main">Bespoke Comfort</h3>
            <p className="text-xs text-txt-secondary leading-relaxed">
              From our artisan mattresses and soundproof acoustic glass to organic Himalayan bath amenities, we curate every sensory detail for total rejuvenation.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-bg-card border border-border-dark space-y-3">
            <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-txt-main">24-Point Quality Certified</h3>
            <p className="text-xs text-txt-secondary leading-relaxed">
              Every room undergoes rigorous multi-stage inspection by our housekeeping supervisors before receiving certification for guest arrival.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-bg-card border border-border-dark space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-txt-main">Intuitive Hospitality</h3>
            <p className="text-xs text-txt-secondary leading-relaxed">
              Our 24/7 dedicated concierge, valet, and dining teams anticipate your needs before you ask, ensuring an unforgettable stay.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default AboutPage;
