import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../../data/seedData';

export const PublicFooter = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border-dark mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-400 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-bg-primary stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider text-txt-main">
                  STAY<span className="text-brand-cyan">OPS</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-txt-muted block -mt-1 font-semibold">
                  Grand & Suites
                </span>
              </div>
            </Link>
            <p className="text-xs text-txt-secondary leading-relaxed">
              Experience modern luxury and effortless hospitality. From boutique urban rooms to expansive waterfront suites, stay connected with real-time room discovery and instant reservations.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-cyan font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Best Price Guarantee & Direct Booking Perks</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-txt-main uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-txt-secondary">
              <li>
                <Link to="/rooms" className="hover:text-brand-cyan transition-colors">Available Rooms & Suites</Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-brand-cyan transition-colors">Special Seasonal Offers</Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-brand-cyan transition-colors">Find My Reservation</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-cyan transition-colors">Hotel Operations Workspace</Link>
              </li>
            </ul>
          </div>

          {/* Policies & Amenities */}
          <div>
            <h4 className="text-sm font-semibold text-txt-main uppercase tracking-wider mb-4">Guest Policies</h4>
            <ul className="space-y-2.5 text-xs text-txt-secondary">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                <span>Check-in: 2:00 PM • Check-out: 11:00 AM</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Free Cancellation up to 24h before check-in</span>
              </li>
              <li>100% Smoke-Free Guest Rooms</li>
              <li>24/7 Concierge & Security Services</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold text-txt-main uppercase tracking-wider mb-4">Contact & Location</h4>
            <ul className="space-y-3 text-xs text-txt-secondary">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <span>{HOTEL_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-muted">
          <p>© {new Date().getFullYear()} StayOps Grand & Suites. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>GSTIN: {HOTEL_INFO.gstin}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
